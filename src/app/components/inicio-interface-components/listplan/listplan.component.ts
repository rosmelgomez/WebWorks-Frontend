import { Component, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Plan } from '../../../model/plan';
import { PlanesService } from '../../../services/planes.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-listplan',
  standalone: true,
  imports: [RouterModule, DecimalPipe],
  templateUrl: './listplan.component.html',
  styleUrl: './listplan.component.css'
})
export class ListplanComponent implements OnInit {
  plans = signal<Plan[]>([]);
  loading = signal(true);
  loadError = signal(false);

  constructor(
    private planService: PlanesService,
    private auth: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    this.getPlanes();
  }

  getPlanes() {
    this.loading.set(true);
    this.loadError.set(false);
    this.planService.getPlanes().subscribe({
      next: (data: Plan[]) => {
        this.plans.set([...data].sort((a, b) => a.price - b.price));
        this.loading.set(false);
      },
      error: () => {
        this.loadError.set(true);
        this.loading.set(false);
      },
    });
  }

  // descripciones no vacias del plan (description1..description8)
  features(plan: Plan): string[] {
    return [plan.description1, plan.description2, plan.description3, plan.description4,
      plan.description5, plan.description6, plan.description7, plan.description8]
      .filter((d): d is string => !!d && d.trim().length > 0);
  }

  savePlan(id: number, price: number) {
    this.planService.saveIdPlan(id);
    this.planService.savePricePlan(price);
    this.router.navigate([this.auth.isLoggedIn() ? '/subscription' : '/login']);
  }
}
