import { getPracticeDates } from "../lib/progress";

const DAYS_TO_SHOW = 28;

function getRecentDates(): string[] {
  const dates: string[] = [];
  const today = new Date();
  for (let i = DAYS_TO_SHOW - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
}

export function DailyCalendar() {
  const practiceDates = new Set(getPracticeDates());
  const recentDates = getRecentDates();

  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium text-slate-600">Last 4 weeks</h3>
      <div className="mt-2 grid grid-cols-7 gap-1">
        {recentDates.map((date) => {
          const practiced = practiceDates.has(date);
          const day = date.slice(8, 10);
          const isToday = date === new Date().toISOString().slice(0, 10);

          return (
            <div
              key={date}
              className={`flex aspect-square items-center justify-center rounded-lg text-xs ${
                practiced
                  ? "bg-emerald-500 text-white"
                  : isToday
                    ? "border-2 border-slate-300 bg-slate-50"
                    : "bg-slate-100 text-slate-400"
              }`}
              title={date}
              aria-label={
                practiced ? `Practiced on ${date}` : `No practice on ${date}`
              }
            >
              {day}
            </div>
          );
        })}
      </div>
      <p className="mt-2 text-xs text-slate-400">
        Green = practiced · Today has a border
      </p>
    </div>
  );
}
