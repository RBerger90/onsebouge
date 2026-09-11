import { Service, signal } from '@angular/core';
import { Goal } from '../../../models/goal.model';

@Service()
export class Goals {
  /**
   * TODO: remplacer par un chargement depuis l'API Express une fois le backend en place.
   * Données de démo pour pouvoir construire l'UI avant que le backend existe.
   */
  private readonly _goals = signal<Goal[]>([
    {
      id: '1',
      title: '1000 pompes',
      targetValue: 1000,
      unit: 'pompes',
      durationDays: 30,
      startDate: new Date().toISOString(),
    },
  ]);
  readonly goals = this._goals.asReadonly();

  addGoal(goal: Goal): void {
    this._goals.update(list => [...list, goal]);
  }

  getGoal(id: string) {
    return this.goals().find(goal => goal.id === id);
  }
}
