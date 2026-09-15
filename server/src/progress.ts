export type ProgressEntry = {
  id: string;
  goalId: string;
  date: string;
  value: number;
};

const progresses: ProgressEntry[] = [];

export function findProgressEntriesByGoalId(goalId: string): ProgressEntry[] {
  return progresses.filter((entry) => entry.goalId === goalId);
}

export function createProgressEntry(entry: ProgressEntry): void {
  progresses.push(entry);
}
