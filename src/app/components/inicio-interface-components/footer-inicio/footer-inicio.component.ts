import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-footer-inicio',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer-inicio.component.html',
  styleUrl: './footer-inicio.component.css'
})
export class FooterInicioComponent {

}
