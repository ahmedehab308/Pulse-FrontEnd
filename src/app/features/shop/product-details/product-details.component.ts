import { CartService } from './../../../core/services/cart.service';
import { Product } from './../../../shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from './../../../core/services/shop.service';
import { Component, inject, OnInit } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';


@Component({
  selector: 'app-product-details',
  imports: [MatProgressSpinnerModule, CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatIconModule,
    MatDividerModule,
    MatLabel,
    MatInput,
    MatDivider,
    CurrencyPipe,
    FormsModule

  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  private ShopService:ShopService=inject(ShopService);
  private activatedRoute=inject(ActivatedRoute);
  private cartService = inject(CartService);

  product?: Product;
  quantityInCart = 0;
  quantity = 1;

  ngOnInit(): void {
    this.loadProduct();
  }
  loadProduct(){
    const id=this.activatedRoute.snapshot.paramMap.get('id');

    if(id) this.ShopService.getProduct(+id).subscribe({
      next: response =>{
        this.product = response
        this.updateQuantityInBasket()
       },
      error: error => console.log(error),
      complete: () => console.log('Request completed')
    });
  }

  updateCart() {
    if (!this.product) return;
    if (this.quantity > this.quantityInCart) {
      const itemsToAdd = this.quantity - this.quantityInCart;
      this.quantityInCart += itemsToAdd;
      this.cartService.addItemToCart(this.product, itemsToAdd);
    } else {
      const itemsToRemove = this.quantityInCart - this.quantity;
      this.quantityInCart -= itemsToRemove;
      this.cartService.removeItemFromCart(this.product.id, itemsToRemove);
    }
  








  }

  updateQuantityInBasket() {
  this.quantityInCart = this.cartService.cart()?.items.find(item => item.productId === this.product?.id)?.quantity || 0;
  this.quantity = this.quantityInCart || 1;

  }
  getButtonText() {
  return this.quantityInCart > 0 ? 'Update Cart' : 'Add to Cart';
  }



}
