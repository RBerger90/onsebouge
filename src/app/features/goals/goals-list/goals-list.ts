import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Goals } from '../services/goals';

@Component({
  imports: [RouterLink],
  selector: 'app-goals-list',
  styleUrl: './goals-list.scss',
  templateUrl: './goals-list.html',
})
export class GoalsList {
  private readonly goalsService = inject(Goals);
  protected readonly goals = this.goalsService.goals;
}
