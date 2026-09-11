import { Component, computed, inject, input } from '@angular/core';
import { Goals } from '../services/goals';

@Component({
  imports: [],
  selector: 'app-goal-detail',
  styleUrl: './goal-detail.scss',
  templateUrl: './goal-detail.html',
})
export class GoalDetail {
  readonly id = input.required<string>(); // reçoit le :id de la route, aucun ActivatedRoute à injecter
  private readonly goals = inject(Goals);
  protected readonly goal = computed(() => this.goals.getGoal(this.id()));
}
