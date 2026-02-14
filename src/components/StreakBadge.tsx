import { getStreak, hasPracticedToday } from "../lib/progress";

export function StreakBadge() {
  const streak = getStreak();
  const practicedToday = hasPracticedToday();

  return (
    <div className="mt-4 flex items-center gap-3">
      <div className="flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5">
        <span className="text-lg">🔥</span>
        <span className="text-sm font-medium text-amber-800">
          {streak} day{streak !== 1 ? "s" : ""} streak
        </span>
      </div>
      {practicedToday && (
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">
          Practiced today ✓
        </span>
      )}
    </div>
  );
}
