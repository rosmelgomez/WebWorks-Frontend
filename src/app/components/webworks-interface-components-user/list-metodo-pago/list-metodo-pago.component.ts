import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MethodPayment } from '../../../model/methodPayment';
import { MethodpaymentService } from '../../../services/methodpayment.service';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-list-metodo-pago',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './list-metodo-pago.component.html',
  styleUrl: './list-metodo-pago.component.css'
})
export class ListMetodoPagoComponent implements OnInit {

  dataSource = { data: [] as MethodPayment[] };
  isLoading = true;
  loadError = '';

  public NameUser: string = '';

  constructor(
    private userService: UserService,
    private methodPaymentService: MethodpaymentService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    console.clear();
    this.getCard();
  }

  getCard()  {
    this.isLoading = true;
    this.loadError = '';
    const userId = parseInt(this.userService.getId()!);
    if (isNaN(userId)) {
      this.isLoading = false;
      this.loadError = 'Usuario no identificado.';
      return;
    }
    this.methodPaymentService.methodsPaymentByUser(userId).subscribe({
      next: (data: MethodPayment[]) => {
        if(data){
          this.dataSource.data = data;
          this.NameUser = this.userService.getName();
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.loadError = 'No se pudieron cargar los métodos de pago.';
      }
    });
  }

  saveData(id: number) {
    this.methodPaymentService.saveId(id);
    this.router.navigate(["/addMethodPayment"]);
  }

  newCard() {
    this.methodPaymentService.deleteIdSave();
    this.router.navigate(["/addMethodPayment"]);
  }
}
