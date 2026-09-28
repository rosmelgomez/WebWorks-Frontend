import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { MethodPayment } from '../../../model/methodPayment';
import {CommonModule} from '@angular/common';
import { MethodpaymentService } from '../../../services/methodpayment.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-agregar-metodo-pago',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ],
  templateUrl: './agregar-metodo-pago.component.html',
  styleUrl: './agregar-metodo-pago.component.css',
})
export class AgregarMetodoPagoComponent implements OnInit {

  public cardForm!: FormGroup
  public nameUser: string = ''
  public confirm: boolean = false;
  isFlipped: boolean = false;
  isLoading = false;
  loadError = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private methodPaymentService: MethodpaymentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.clear()
    this.reactiveForm()
  }

  reactiveForm() {
    this.cardForm = this.formBuilder.group({
      numberCard: ['', [Validators.required]],
      dateCard: ['', [Validators.required]],
      cvv: ['', [Validators.required]],
    })
    this.nameUser = this.userService.getName();

    if (this.methodPaymentService.getIdCardSave() != null) {
      this.confirm=true;
      this.isLoading = true;
      this.methodPaymentService.getMethodPaymentById(parseInt(this.methodPaymentService.getIdCardSave())).subscribe({ next: (methodPayment: MethodPayment) => {
        this.cardForm.get('numberCard')!.setValue(methodPayment.numberCard);
        this.cardForm.get('dateCard')!.setValue(methodPayment.dateCard);
        this.cardForm.get('cvv')!.setValue(methodPayment.cvv);
        this.isLoading = false;
      }, error: () => {
        this.isLoading = false;
        this.loadError = 'No se pudo cargar el método de pago.';
      }})
    }

  }

  addOrUpdateCard() {
    if (this.cardForm.valid) {
      const dateValue = this.cardForm.get('dateCard')!.value;
      const fullDate = `${dateValue}`;
      const card: MethodPayment = {
        id: 0,
        numberCard: this.cardForm.get('numberCard')!.value,
        dateCard: new Date(fullDate),
        cvv: parseInt(this.cardForm.get('cvv')!.value),
        id_user: parseInt(this.userService.getId()!),
        id_money:1
      }
      if (this.methodPaymentService.getIdCardSave()==null) {
          this.methodPaymentService.addMethodPayment(card).subscribe({
              next: (data) => {
                if (data) {
                  this.router.navigateByUrl("/listMethodPayment");
                  this.cardForm.reset()
                }else{
                 alert('error al crear el card')
                }
              },
            }
          )
      }
      else {
        card.id = parseInt(this.methodPaymentService.getIdCardSave())
        this.methodPaymentService.update(card).subscribe({
            next: (_data) => {
              if(_data){
                this.router.navigateByUrl("/listMethodPayment");
                this.methodPaymentService.deleteIdSave()
                this.cardForm.reset()
              }},
            error: (_err: any) => {
            },
          }
        )
      }}
    else {
      alert("Ingrese todos los datos")
    }
  }

  deleteIdMethodPayment() {
    this.methodPaymentService.deleteIdSave();
  }

  deleteMethodPayment() {
    this.methodPaymentService.delete(parseInt(this.methodPaymentService.getIdCardSave())).subscribe(
      (check:Boolean)=>{
        if(check){
          this.deleteIdMethodPayment();
          this.router.navigateByUrl("/listMethodPayment");
        }
    })
  }

  onCardFocus() {
    this.isFlipped = true;
  }

  onCardBlur() {
    this.isFlipped = false;
  }

  onCardMouseOver() {
    this.isFlipped = true;
  }

  onCardMouseOut() {
    this.isFlipped = false;
  }

}
