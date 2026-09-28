import {Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {CommonModule} from "@angular/common";
import { RouterModule} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {SubscriptionService} from "../../../services/subscription.service";
import {SubscriptionSummary} from "../../../modelComplement/subscriptionSummary";

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-list-subscription',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
  ],
  templateUrl: './list-subscription.component.html',
  styleUrl: './list-subscription.component.css'
})
export class ListSubscriptionComponent implements OnInit {
  displayedColumns: string[] = ['dateStart', 'dateEnd', 'amountTotal','namePlan','numberMethodPayment','namePromotionCode','discountPercentage'];
  dataSource = { data: [] as SubscriptionSummary[] };
  isLoading = true;
  loadError = '';

  constructor(
    private userService: UserService,
    private subscriptionService: SubscriptionService,
  ) {}

  ngOnInit() {
    console.clear();
    this.getSubscriptions()
  }

  getSubscriptions(){
    this.isLoading = true;
    this.loadError = '';
    this.subscriptionService.getSubscriptions(parseInt(this.userService.getId())).subscribe({
      next: (subscriptions:SubscriptionSummary[])=>{
        this.dataSource.data = subscriptions;
        this.isLoading = false;
      }, error: () => {
        this.isLoading = false;
        this.loadError = 'No se pudieron cargar las suscripciones.';
      }})
  }

}
