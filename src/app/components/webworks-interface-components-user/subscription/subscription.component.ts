import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SubscriptionService } from '../../../services/subscription.service';
import { PlanesService } from '../../../services/planes.service';
import { UserService } from '../../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { MethodpaymentService } from '../../../services/methodpayment.service';
import { MethodPayment } from '../../../model/methodPayment';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Subscription} from "../../../model/subscription";
import {PromotionCodeService} from "../../../services/promotioncode.service";
import {PromotionCode} from "../../../model/promotionCode";

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-subscription',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})
export class SubscriptionComponent implements OnInit {
  public subscriptionForm!: FormGroup;
  dataMetodoPago = { data: [] as MethodPayment[] };
  isLoading = false;
  loadError = '';
  public confirm: boolean = true;
  price: number = 0;
  priceDiscount: number = 0;
  priceFinal: number = 0;
  idCard: number = 0;
  idPromotionCode: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private methodPaymentService: MethodpaymentService,
    private subscriptionService: SubscriptionService,
    private plan: PlanesService,
    private promotionCodeService: PromotionCodeService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.clear();
    if(this.plan.getIdPlan() == null){
      this.confirm = false;
    } else {
      this.price = parseFloat(this.plan.getPricePlan() || '0');
      this.priceFinal = this.price;
      if (this.price > 0) {
        this.dateMethodPayment();
      }
      this.reactiveForm();
    }
  }

  reactiveForm() {
    this.subscriptionForm = this.formBuilder.group({
      code: ['', [Validators.required]],
    });
  }

  dateMethodPayment(){
    this.isLoading = true;
    this.loadError = '';
    this.methodPaymentService.methodsPaymentByUser(parseInt(this.userService.getId())).subscribe({
      next: (card: MethodPayment[]) => {
        this.dataMetodoPago.data = card;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.loadError = 'No se pudieron cargar los métodos de pago.';
      }
    });
  }

  datePromotionCode() {
    if(this.subscriptionForm.valid){
      const code = this.subscriptionForm.controls['code'].value;
      this.promotionCodeService.getPromotionCodeByCode(code).subscribe({
        next: (data: PromotionCode) => {
          if(data) {
            this.priceDiscount = data.discountPercentage * this.price;
            this.priceFinal = Math.max(0, this.price - this.priceDiscount);
            this.idPromotionCode = data.id;
          } else {
            this.priceDiscount = 0;
            this.priceFinal = this.price;
            alert("Código de promoción no válido.");
          }
        },
        error: () => {
          this.priceDiscount = 0;
          this.priceFinal = this.price;
          alert("Código de promoción no válido.");
        }
      });
    } else {
      alert("Ingrese un código de promoción.");
    }
  }

  addPremium() {
    const planId = this.plan.getIdPlan();
    if (planId != null) {
      const isFree = this.priceFinal <= 0;
      if (isFree || this.idCard !== 0) {
        const premium: Subscription = {
          id: 0,
          dateStart: new Date(),
          dateEnd: addMonths(new Date(), 6),
          amountTotal: this.priceFinal,
          id_user: parseInt(this.userService.getId()),
          id_plan: parseInt(planId),
          id_methodPayment: isFree ? 0 : this.idCard,
          id_promotionCode: this.idPromotionCode || 0,
        };
        this.subscriptionService.addSubscription(premium).subscribe({
          next: (check: boolean) => {
            if (check) {
              this.plan.deleteData();
              this.router.navigateByUrl('/pageUser');
            } else {
              alert('Error al registrar la suscripción.');
            }
          },
          error: (err) => {
            alert('Error al registrar la suscripción: ' + (err?.error?.message || ''));
          }
        });
      } else {
        alert("Selecciona un método de pago.");
      }
    } else {
      alert("Selecciona un plan.");
    }
  }

  cambiarIdPago(id: number){
    this.idCard = id;
  }
}

const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};
