import { Component, computed, effect, ElementRef, inject, input, viewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Chart } from 'chart.js/auto';
import { ProgressEntry } from '../../../models/progress-entry.model';
import { toDateInputValue } from '../../../utils/toDateInputValue';
import { Goals } from '../services/goals';
import { Progress } from '../services/progress';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-goal-detail',
  styleUrl: './goal-detail.scss',
  templateUrl: './goal-detail.html',
})
export class GoalDetail {
  private chart?: Chart;
  private readonly fb = inject(FormBuilder);
  private readonly progress = inject(Progress);
  private readonly goals = inject(Goals);

  readonly goalId = input.required<string>(); // reçoit le :id de la route, aucun ActivatedRoute à injecter
  protected readonly goal = computed(() => this.goals.getGoal(this.goalId()));
  protected readonly progresses = computed(() => this.progress.getProgresses(this.goalId()));

  protected readonly form = this.fb.nonNullable.group({
    value: [1, [Validators.required, Validators.min(1)]],
    date: [toDateInputValue(new Date()), [Validators.required]],
  });

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.goal()) {
      console.error('Goal not found for id:', this.goalId());
      return;
    }

    const { value, date } = this.form.getRawValue();
    const uniqueId = crypto.randomUUID();
    this.progress.addProgress({ id: uniqueId, goalId: this.goal()!.id, value, date });
  }

  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('chartCanvas');

  constructor() {
    effect(() => {
      const entries = this.progresses(); // lu ici → l'effect se redéclenche à chaque changement
      this.renderChart(entries);
    });
  }

  private renderChart(entries: ProgressEntry[]): void {
    const labels = entries.map((e) => e.date);
    const cumulative = entries.reduce<number[]>((acc, e, i) => {
      acc.push((acc[i - 1] ?? 0) + e.value);
      return acc;
    }, []);

    this.chart?.destroy(); // important : détruire l'ancien graphique avant d'en recréer un
    this.chart = new Chart(this.canvasRef().nativeElement, {
      type: 'line',
      data: { labels, datasets: [{ label: 'Progression', data: cumulative }] },
    });
  }
}
