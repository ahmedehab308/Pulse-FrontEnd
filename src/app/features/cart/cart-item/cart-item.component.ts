import { CurrencyPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { CartItem } from '../../../shared/models/cart';
import { Product } from '../../../shared/models/product';

@Component({
  selector: 'app-cart-item',
  imports: [
    RouterLink,
    MatIcon,
    CurrencyPipe,
    MatButton],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {

  cartService = inject(CartService);
  item = input.required<CartItem>();

  plus(){
    this.cartService.addItemToCart(this.item());
  }
  minus(){
    this.cartService.removeItemFromCart(this.item().productId);
  }
  removeItem(){
        this.cartService.removeItemFromCart(this.item().productId,this.item().quantity);
  }


}
