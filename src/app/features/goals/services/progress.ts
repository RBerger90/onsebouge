import { Service, signal } from '@angular/core';
import { ProgressEntry } from '../../../models/progress-entry.model';

@Service()
export class Progress {
  /**
   * TODO: remplacer par un chargement depuis l'API Express une fois le backend en place.
   * Données de démo pour pouvoir construire l'UI avant que le backend existe.
   */
  private readonly _progresses = signal<ProgressEntry[]>([
    {
      id: '1',
      goalId: '1',
      date: new Date().toISOString(),
      value: 500,
    },
  ]);
  readonly progresses = this._progresses.asReadonly();

  addProgress(progress: ProgressEntry): void {
    this._progresses.update((list) => [...list, progress]);
  }

  getProgresses(goalId: string) {
    return this.progresses().filter((progress) => progress.goalId === goalId);
  }

  getOneProgress(id: string) {
    return this.progresses().find((progress) => progress.id === id);
  }
}
