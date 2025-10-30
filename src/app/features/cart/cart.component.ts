import { CartService } from './../../core/services/cart.service';
import { Component, inject } from '@angular/core';
import { CartItemComponent } from './cart-item/cart-item.component';
import { OrderSummaryComponent } from '../../shared/components/order-summary/order-summary.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CartItemComponent,OrderSummaryComponent,EmptyStateComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartService :CartService =inject(CartService);
  private router = inject(Router);


   onAction() {
    this.router.navigateByUrl('/shop');
  }

}
