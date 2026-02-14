import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getScenarioById } from "../data/scenarios";
import { useSpeechSynthesis } from "../hooks/useSpeechSynthesis";
import type { ConversationTurn } from "../types/scenario";
import { recordPractice } from "../lib/progress";

function PlayButton({
  onClick,
  isSpeaking,
  disabled,
}: {
  onClick: () => void;
  isSpeaking: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isSpeaking}
      className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 text-white hover:bg-slate-600 disabled:opacity-50 focus:outline-none focus:ring-4 focus:ring-slate-400"
      aria-label="Play partner's line"
    >
      {isSpeaking ? (
        <span className="h-4 w-4 animate-pulse rounded-full bg-white" />
      ) : (
        <svg
          className="h-6 w-6 ml-0.5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  );
}

export default function ConversationPlayer() {
  const { scenarioId } = useParams<{ scenarioId: string }>();
  const navigate = useNavigate();
  const scenario = scenarioId ? getScenarioById(scenarioId) : undefined;

  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [showPinyin, setShowPinyin] = useState(false);
  const [showTranslation, setShowTranslation] = useState(true);
  const [typedFallback, setTypedFallback] = useState("");

  const { speak, stop, isSpeaking } = useSpeechSynthesis();

  useEffect(() => {
    if (!scenario) return;
    if (currentTurnIndex >= scenario.turns.length) {
      recordPractice(scenario.id);
    }
  }, [currentTurnIndex, scenario]);

  if (!scenario) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <p className="text-slate-600">Scenario not found.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-emerald-600 hover:underline"
        >
          Back to scenarios
        </button>
      </div>
    );
  }

  const currentTurn: ConversationTurn | undefined =
    scenario.turns[currentTurnIndex];
  const isPartnerTurn = currentTurn?.speaker === "partner";
  const isComplete = currentTurnIndex >= scenario.turns.length;

  const handlePlayPartner = () => {
    if (currentTurn && currentTurn.speaker === "partner") {
      speak(currentTurn.text);
    }
  };

  const handleUserTurnComplete = () => {
    setCurrentTurnIndex((i) => i + 1);
    setTypedFallback("");
  };

  const handleRestart = () => {
    setCurrentTurnIndex(0);
    setTypedFallback("");
    stop();
  };

  if (isComplete) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-800">
            Scenario complete
          </h2>
          <p className="mt-2 text-slate-600">
            You finished "{scenario.title}". Great job!
          </p>
          <div className="mt-8 flex gap-4">
            <button
              onClick={handleRestart}
              className="rounded-lg bg-emerald-500 px-6 py-2.5 font-medium text-white hover:bg-emerald-600"
            >
              Practice again
            </button>
            <button
              onClick={() => navigate("/")}
              className="rounded-lg border border-slate-300 px-6 py-2.5 font-medium text-slate-700 hover:bg-slate-50"
            >
              Back to scenarios
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <header className="mb-8">
        <button
          onClick={() => navigate("/")}
          className="text-sm text-slate-500 hover:text-slate-700"
        >
          ← Back
        </button>
        <h1 className="mt-2 text-xl font-semibold text-slate-800">
          {scenario.title}
        </h1>
        <p className="mt-1 text-sm text-slate-500">{scenario.situation}</p>
        <div className="mt-2 flex gap-2">
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
              scenario.category === "work"
                ? "bg-blue-100 text-blue-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {scenario.category === "work" ? "Work" : "Everyday"}
          </span>
          <span className="text-xs text-slate-400">
            Turn {currentTurnIndex + 1} / {scenario.turns.length}
          </span>
        </div>
      </header>

      <div className="rounded-2xl bg-white p-8 shadow-sm">
        {currentTurn && (
          <>
            <div className="mb-6">
              <p className="text-lg font-medium text-slate-700">
                {isPartnerTurn ? "Partner says:" : "You say:"}
              </p>
              <p
                className="mt-3 text-2xl font-medium text-slate-900"
                lang="zh-CN"
              >
                {currentTurn.text}
              </p>
              {showPinyin && currentTurn.pinyin && (
                <p className="mt-2 text-sm text-slate-500">
                  {currentTurn.pinyin}
                </p>
              )}
              {showTranslation && currentTurn.translation && (
                <p className="mt-1 text-sm italic text-slate-500">
                  {currentTurn.translation}
                </p>
              )}
            </div>

            <div className="flex flex-col items-center gap-6">
              {isPartnerTurn ? (
                <div className="flex items-center gap-4">
                  <PlayButton
                    onClick={handlePlayPartner}
                    isSpeaking={isSpeaking}
                  />
                  <span className="text-sm text-slate-500">
                    Listen, then tap Next when ready
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 w-full">
                  <div className="w-full">
                    <p className="mb-2 text-sm text-slate-500">
                      Type your response in Chinese:
                    </p>
                    <input
                      type="text"
                      value={typedFallback}
                      onChange={(e) => setTypedFallback(e.target.value)}
                      placeholder="用中文输入..."
                      className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                      lang="zh-CN"
                      autoComplete="off"
                    />
                    {typedFallback && (
                      <p className="mt-2 text-sm text-slate-600" lang="zh-CN">
                        You typed: {typedFallback}
                      </p>
                    )}
                  </div>
                  {currentTurn.suggestions && (
                    <div className="w-full rounded-lg bg-slate-50 p-4">
                      <p className="text-xs font-medium text-slate-500">
                        Suggested responses:
                      </p>
                      <ul className="mt-2 space-y-1 text-sm text-slate-700">
                        {currentTurn.suggestions.map((s, i) => (
                          <li key={i} lang="zh-CN">
                            • {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <button
                    onClick={handleUserTurnComplete}
                    className="rounded-lg bg-emerald-500 px-6 py-2.5 font-medium text-white hover:bg-emerald-600"
                  >
                    Next
                  </button>
                </div>
              )}

              {isPartnerTurn && (
                <button
                  onClick={() => setCurrentTurnIndex((i) => i + 1)}
                  className="rounded-lg bg-emerald-500 px-6 py-2.5 font-medium text-white hover:bg-emerald-600"
                >
                  Next
                </button>
              )}
            </div>
          </>
        )}
      </div>

      <div className="mt-6 flex gap-4">
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={showTranslation}
            onChange={(e) => setShowTranslation(e.target.checked)}
            className="rounded border-slate-300"
          />
          Show translation
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={showPinyin}
            onChange={(e) => setShowPinyin(e.target.checked)}
            className="rounded border-slate-300"
          />
          Show pinyin
        </label>
      </div>
    </div>
  );
}
