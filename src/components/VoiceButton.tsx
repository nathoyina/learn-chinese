interface VoiceButtonProps {
  isListening: boolean;
  isSupported: boolean;
  onStart: () => void;
  onStop: () => void;
  "aria-label": string;
}

export function VoiceButton({
  isListening,
  isSupported,
  onStart,
  onStop,
  "aria-label": ariaLabel,
}: VoiceButtonProps) {
  if (!isSupported) {
    return (
      <button
        disabled
        className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-300 text-slate-500"
        aria-label="Voice not supported"
      >
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
          />
        </svg>
      </button>
    );
  }

  return (
    <button
      onClick={isListening ? onStop : onStart}
      className={`flex h-16 w-16 items-center justify-center rounded-full transition-colors focus:outline-none focus:ring-4 focus:ring-emerald-300 ${
        isListening
          ? "bg-red-500 text-white hover:bg-red-600"
          : "bg-emerald-500 text-white hover:bg-emerald-600"
      }`}
      aria-label={ariaLabel}
      aria-pressed={isListening}
    >
      {isListening ? (
        <svg
          className="h-8 w-8"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <rect x="6" y="6" width="12" height="12" rx="2" />
        </svg>
      ) : (
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>
      )}
    </button>
  );
}
