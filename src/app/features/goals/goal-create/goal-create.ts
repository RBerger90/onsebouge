import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Goals } from '../services/goals';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-goal-create',
  styleUrl: './goal-create.scss',
  templateUrl: './goal-create.html',
})
export class GoalCreate {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly goals = inject(Goals);

  protected readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required]],
    targetValue: [1000, [Validators.required, Validators.min(1)]],
    unit: ['pompes', [Validators.required]],
    durationDays: [30, [Validators.required, Validators.min(1)]],
    startDate: [toDateInputValue(new Date()), [Validators.required]],
  });

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { title, targetValue, unit, durationDays, startDate } = this.form.getRawValue();
    const goalId = crypto.randomUUID();
    this.goals.addGoal({id: goalId, title, targetValue, unit, durationDays,  startDate });
    this.router.navigateByUrl('/goals/' + goalId);
  }
}

function toDateInputValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
