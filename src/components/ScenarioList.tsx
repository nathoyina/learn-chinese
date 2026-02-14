import { useState } from "react";
import { Link } from "react-router-dom";
import { getAllScenarios } from "../data/scenarios";
import { StreakBadge } from "./StreakBadge";
import { DailyCalendar } from "./DailyCalendar";
import type { Scenario, ScenarioCategory } from "../types/scenario";
import { getCompletedCount } from "../lib/progress";

const CATEGORIES: { value: ScenarioCategory; label: string }[] = [
  { value: "everyday", label: "Everyday" },
  { value: "work", label: "Work" },
];

function ScenarioCard({ scenario }: { scenario: Scenario }) {
  const completedCount = getCompletedCount(scenario.id);

  return (
    <Link
      to={`/practice/${scenario.id}`}
      className="block rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-slate-800">{scenario.title}</h3>
          <p className="mt-1 text-sm text-slate-500 line-clamp-2">
            {scenario.situation}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
            scenario.category === "work"
              ? "bg-blue-100 text-blue-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {scenario.category === "work" ? "Work" : "Everyday"}
        </span>
      </div>
      <p className="mt-3 text-xs text-slate-400">
        {scenario.turns.length} turns
        {completedCount > 0 && ` · Completed ${completedCount}×`}
      </p>
    </Link>
  );
}

export default function ScenarioList() {
  const [categoryFilter, setCategoryFilter] = useState<ScenarioCategory | "all">(
    "all"
  );

  const allScenarios = getAllScenarios();
  const scenarios =
    categoryFilter === "all"
      ? allScenarios
      : allScenarios.filter((s) => s.category === categoryFilter);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">
          中文会话练习
        </h1>
        <p className="mt-1 text-slate-600">
          Practice conversational Chinese with voice. Listen, speak, improve.
        </p>
        <StreakBadge />
        <DailyCalendar />
      </header>

      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setCategoryFilter("all")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            categoryFilter === "all"
              ? "bg-slate-800 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          All
        </button>
        {CATEGORIES.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setCategoryFilter(value)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              categoryFilter === value
                ? "bg-slate-800 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-1">
        {scenarios.map((scenario) => (
          <ScenarioCard key={scenario.id} scenario={scenario} />
        ))}
      </div>

      {scenarios.length === 0 && (
        <p className="py-12 text-center text-slate-500">
          No scenarios in this category yet.
        </p>
      )}
    </div>
  );
}
