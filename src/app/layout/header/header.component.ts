import { CartService } from './../../core/services/cart.service';
import { BusyService } from './../../core/services/busy.service';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account.service';
import { MatMenu, MatMenuTrigger } from "@angular/material/menu";
import { MatDivider } from '@angular/material/divider';
import { IsAdmin } from '../../shared/directives/is-admin';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    CommonModule,
    FormsModule,
    MatMenu,
    MatMenuTrigger,
    MatDivider,
    IsAdmin
],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  BusyService=inject(BusyService)
  cartService:CartService=inject(CartService);
  accountService=inject(AccountService);
  private router =inject(Router)

  logout(){
    this.accountService.logout().subscribe({
      next:()=>{
        this.accountService.currentUser.set(null);
        this.router.navigateByUrl('/');
      }
    })
  }





}
