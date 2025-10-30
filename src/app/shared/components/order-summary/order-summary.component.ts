import { CurrencyPipe, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-order-summary',
  imports: [
    MatButton,
    RouterLink,
    CurrencyPipe,
    FormsModule,
  ],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss'
})
export class OrderSummaryComponent {
  cartService=inject(CartService);
  location=inject(Location);


}
