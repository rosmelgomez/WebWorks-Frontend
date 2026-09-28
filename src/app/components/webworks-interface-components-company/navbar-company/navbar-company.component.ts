import {Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {CommonModule} from "@angular/common";
import {Router, RouterModule} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {CompanyService} from "../../../services/company.service";

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-navbar-company',
  standalone: true,
    imports: [
      CommonModule,
      RouterModule,
    ],
  templateUrl: './navbar-company.component.html',
  styleUrl: './navbar-company.component.css'
})
export class NavbarCompanyComponent implements OnInit{

  constructor(
    private auth: AuthService,
    private companyService: CompanyService,
    private router: Router) {}
  ngOnInit(): void {

  }

  logoutCompany() {
    this.auth.logout();
    this.companyService.deleteIdCompany();
    this.router.navigateByUrl("/").catch(() => {});
  }

}
