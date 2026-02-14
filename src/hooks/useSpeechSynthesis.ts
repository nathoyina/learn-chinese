import { useState, useEffect, useCallback } from "react";

const ZH_CN = "zh-CN";

function getChineseVoice(): SpeechSynthesisVoice | null {
  const voices = speechSynthesis.getVoices();
  const chinese = voices.find((v) => v.lang.startsWith("zh"));
  return chinese ?? voices[0] ?? null;
}

export function useSpeechSynthesis() {
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [chineseVoice, setChineseVoice] = useState<SpeechSynthesisVoice | null>(
    null
  );

  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        setChineseVoice(getChineseVoice());
        setVoicesLoaded(true);
      }
    };

    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!("speechSynthesis" in window)) {
        console.warn("Speech synthesis not supported");
        return;
      }

      speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = ZH_CN;
      utterance.rate = 0.9;

      if (chineseVoice) {
        utterance.voice = chineseVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      speechSynthesis.speak(utterance);
    },
    [chineseVoice]
  );

  const stop = useCallback(() => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return { speak, stop, isSpeaking, voicesLoaded };
}
