import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { toDateInputValue } from '../../../utils/toDateInputValue';
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
    this.goals.addGoal({ id: goalId, title, targetValue, unit, durationDays, startDate });
    this.router.navigateByUrl('/goals/' + goalId);
  }
}
