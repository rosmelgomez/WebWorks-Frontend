import { Component, OnInit, computed, signal, ChangeDetectionStrategy } from '@angular/core';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../../model/user';
import { Repository } from '../../../model/repository';
import { SubscriptionCheck } from '../../../modelComplement/subscriptioCheck';
import { EmploymentSummary } from '../../../modelComplement/employmentSummary';
import { CommentProfileSummary } from '../../../modelComplement/commentProfileSummary';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { SubscriptionService } from '../../../services/subscription.service';
import { RepositoryService } from '../../../services/repository.service';
import { ProjectService } from '../../../services/project.service';
import { MethodpaymentService } from '../../../services/methodpayment.service';
import { EmploymentService } from '../../../services/employment.service';
import { CommentProfileService } from '../../../services/commentprofile.service';

type Load = 'loading' | 'ready' | 'error';

// limite a partir del cual los cupos se muestran como numero y no como nodos
const MAX_SLOTS = 12;

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-page-usuario',
  standalone: true,
  imports: [RouterModule, DatePipe, NgTemplateOutlet],
  templateUrl: './page-usuario.component.html',
  styleUrl: './page-usuario.component.css'
})
export class PageUsuarioComponent implements OnInit {
  user = signal<User | null>(null);
  plan = signal<SubscriptionCheck | null>(null);
  repositories = signal<Repository[]>([]);
  employments = signal<EmploymentSummary[]>([]);
  comments = signal<CommentProfileSummary[]>([]);

  userState = signal<Load>('loading');
  repoState = signal<Load>('loading');
  jobState = signal<Load>('loading');
  commentState = signal<Load>('loading');
  planState = signal<Load>('loading');

  hasActiveSubscription = computed(() => !!this.plan()?.status);
  // el uso solo se muestra cuando plan y repositorios ya llegaron (nunca limites supuestos)
  usageReady = computed(() => this.planState() === 'ready' && this.repoState() === 'ready');
  // una sola codificacion para ambos medidores
  useSlots = computed(() => this.repoLimit() <= MAX_SLOTS && this.projectLimit() <= MAX_SLOTS);

  projectCount = computed(() => this.repositories().reduce((total, repo) => total + (repo.numberProject || 0), 0));
  repoLimit = computed(() => this.plan()?.maxNumberRepository ?? 0);
  projectLimit = computed(() => this.plan()?.maxNumberProject ?? 0);
  planName = computed(() => {
    if (!this.plan()?.status) return 'Sin suscripción activa';
    return this.plan()?.planName ? `Plan ${this.plan()?.planName}` : 'Plan Activo';
  });

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private subscriptionService: SubscriptionService,
    private repositoryService: RepositoryService,
    private projectService: ProjectService,
    private methodPaymentService: MethodpaymentService,
    private employmentService: EmploymentService,
    private commentService: CommentProfileService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.deleteInformation();
    this.getUserInformation();
    this.getEmployments();
  }

  getUserInformation() {
    this.userState.set('loading');
    this.userService.getUser(this.authService.getUser() || '').subscribe({
      next: (data: User) => {
        this.user.set(data);
        this.userState.set('ready');
        this.getPlan(data.id);
        this.getRepositories(data.id);
        this.getComments(data.id);
      },
      error: () => {
        this.userState.set('error');
        this.repoState.set('error');
        this.commentState.set('error');
        this.planState.set('error');
      },
    });
  }

  getPlan(idUser: number) {
    this.subscriptionService.checkSubscription(idUser).subscribe({
      next: (check: SubscriptionCheck) => {
        this.plan.set(check);
        this.planState.set('ready');
      },
      error: () => this.planState.set('error'),
    });
  }

  getRepositories(idUser: number) {
    this.repoState.set('loading');
    this.repositoryService.getRepositoriesUser(idUser).subscribe({
      next: repos => { this.repositories.set(repos); this.repoState.set('ready'); },
      error: () => this.repoState.set('error'),
    });
  }

  getEmployments() {
    this.jobState.set('loading');
    this.employmentService.getEmployments().subscribe({
      next: jobs => { this.employments.set(jobs.slice(0, 3)); this.jobState.set('ready'); },
      error: () => this.jobState.set('error'),
    });
  }

  getComments(idUser: number) {
    this.commentState.set('loading');
    this.commentService.getComment(idUser).subscribe({
      next: comments => { this.comments.set(comments.slice(0, 2)); this.commentState.set('ready'); },
      error: () => this.commentState.set('error'),
    });
  }

  retryUser() {
    this.getUserInformation();
  }

  // cupos del plan como nodos: llenos los usados, vacios los libres
  slots(used: number, limit: number): boolean[] {
    return Array.from({ length: limit }, (_, i) => i < used);
  }

  // uso proporcional cuando el limite es demasiado alto para dibujar un nodo por cupo
  percent(used: number, limit: number): number {
    return limit > 0 ? Math.min(100, Math.round((used / limit) * 100)) : 0;
  }

  // abrir un repositorio: misma navegacion que la lista de repositorios
  openRepository(repo: Repository) {
    this.repositoryService.saveDateImport(repo.id, String(repo.name), repo.numberProject);
    this.router.navigateByUrl('/listProyecto');
  }

  deleteInformation() {
    this.repositoryService.deleteDateSave();
    this.projectService.deleteIdSave();
    this.methodPaymentService.deleteIdSave();
  }
}
