const STORAGE_KEY = "chinese-practice-progress";

export interface ProgressData {
  completedScenarios: Record<string, number>;
  practiceDates: string[];
}

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

function loadProgress(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as ProgressData;
      return {
        completedScenarios: parsed.completedScenarios ?? {},
        practiceDates: parsed.practiceDates ?? [],
      };
    }
  } catch {
    // ignore
  }
  return { completedScenarios: {}, practiceDates: [] };
}

function saveProgress(data: ProgressData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function recordPractice(scenarioId: string): void {
  const data = loadProgress();
  const today = getToday();

  data.completedScenarios[scenarioId] =
    (data.completedScenarios[scenarioId] ?? 0) + 1;

  if (!data.practiceDates.includes(today)) {
    data.practiceDates.push(today);
    data.practiceDates.sort();
  }

  saveProgress(data);
}

export function hasPracticedToday(): boolean {
  const data = loadProgress();
  return data.practiceDates.includes(getToday());
}

export function getStreak(): number {
  const data = loadProgress();
  const dates = [...data.practiceDates].sort().reverse();
  if (dates.length === 0) return 0;

  const today = getToday();
  if (dates[0] !== today) return 0;

  let streak = 0;
  let cursor = new Date(today);

  for (const d of dates) {
    const dStr = cursor.toISOString().slice(0, 10);
    if (d === dStr) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

export function getCompletedCount(scenarioId: string): number {
  const data = loadProgress();
  return data.completedScenarios[scenarioId] ?? 0;
}

export function getPracticeDates(): string[] {
  const data = loadProgress();
  return data.practiceDates;
}
