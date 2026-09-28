import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';

type Lane = 'dev' | 'co';

interface GraphRow {
  kind: 'commit' | 'pair' | 'branch' | 'merge';
  lane?: Lane;
  hash?: string;
  message?: string;
  // fila "pair": un commit en cada rama a la misma altura
  dev?: { hash: string; message: string };
  co?: { hash: string; message: string };
}

interface Step {
  title: string;
  detail: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-inicio-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './inicio-page.component.html',
  styleUrl: './inicio-page.component.css'
})
export class InicioPageComponent {
  // rama resaltada al pasar sobre una de las dos puertas
  focusLane = signal<Lane | null>(null);

  // historial de ejemplo: el tiempo avanza hacia abajo hasta el merge
  readonly graph: GraphRow[] = [
    { kind: 'pair', dev: { hash: 'a3f9c1', message: 'perfil de developer' }, co: { hash: '7be2d0', message: 'empresa registrada' } },
    { kind: 'commit', lane: 'dev', hash: 'e41b8a', message: 'repositorio tienda-angular' },
    { kind: 'commit', lane: 'co', hash: 'c09f37', message: 'oferta Frontend Jr.' },
    { kind: 'commit', lane: 'dev', hash: '5d2e90', message: 'proyecto api-pagos' },
    { kind: 'branch', hash: '2f71d3', message: 'postulación con portafolio' },
    { kind: 'commit', lane: 'co', hash: '91ac4e', message: 'revisión de 2 repositorios' },
    { kind: 'merge', hash: 'b8e05a', message: 'postulación aceptada' },
  ];

  readonly developerSteps: Step[] = [
    { title: 'Crea tu perfil', detail: 'Tus datos de contacto y tu foto, listos para las empresas.' },
    { title: 'Publica repositorios y proyectos', detail: 'Agrupa cada proyecto en su repositorio; ese es tu portafolio.' },
    { title: 'Postula a ofertas', detail: 'Cada postulación viaja con tu portafolio, no solo con un CV.' },
    { title: 'Crece a tu ritmo', detail: 'El plan gratuito admite 3 repositorios y 2 proyectos; un plan de pago amplía ese límite.' },
  ];

  readonly companySteps: Step[] = [
    { title: 'Registra tu empresa', detail: 'RUC, razón social, sector y una descripción de lo que hacen.' },
    { title: 'Publica ofertas de empleo', detail: 'Crea, edita o elimina tus ofertas cuando lo necesites.' },
    { title: 'Revisa el trabajo real', detail: 'Abre el perfil y los repositorios de cada postulante.' },
    { title: 'Decide', detail: 'Acepta o rechaza postulaciones desde un solo lugar.' },
  ];

  setFocus(lane: Lane | null) {
    this.focusLane.set(lane);
  }
}
