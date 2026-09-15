export type Goal = {
  id: string;
  userId: string;
  title: string;
  targetValue: number;
  unit: string;
  durationDays: number;
  startDate: string;
};

const goals: Goal[] = [];

export function findGoalsByUserId(userId: string): Goal[] {
  return goals.filter((goal) => goal.userId === userId);
}

export function findGoalsById(id: string): Goal | undefined {
  return goals.find((goal) => goal.id === id);
}

export function createGoal(goal: Goal): void {
  goals.push(goal);
}
