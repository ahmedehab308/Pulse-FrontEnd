import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Cart, CartItem } from '../../shared/models/cart';
import { Product } from '../../shared/models/product';
import { map } from 'rxjs';
import { DeliveryMethod } from '../../shared/models/DeliveryMethod';

@Injectable({
  providedIn: 'root'
})
export class CartService {
    baseUrl= environment.apiurl;
    private http=inject(HttpClient);
    cart=signal<Cart|null>(null);
    itemCount=computed(()=>{
      return this.cart()?.items.reduce((sum,item)=>sum+item.quantity,0)||0
      // return this.cart()?.items.length || 0;
    })
    selectedDelivery=signal<DeliveryMethod|null>(null);
    totals=computed(()=>{
      if(!this.cart()) return null;
      const subTotal= this.cart()!.items.reduce((total,item)=>total+(item.price*item.quantity),0)
      const shipping=this.selectedDelivery()?.price ??0;
      const discount=0;
      return {
      subTotal,
      shipping,
      discount,
      total:subTotal+ shipping-(discount*subTotal/100)
    };
    })

    getCart(id:string){
      return this.http.get<Cart>(this.baseUrl+'cart?id='+id).pipe(
        map(cart=>{
          this.cart.set(cart);
          return cart;
        })
      )
    }

    setCart(cart:Cart){
      return this.http.post<Cart>(this.baseUrl+'cart',cart).subscribe({
        next:cart=>this.cart.set(cart),
        error:err=>console.log(err)
      })
    }

    addItemToCart(item:CartItem|Product,quantity:number=1){
      const cart=this.cart()??this.createCart();
      if(this.isProduct(item)){
        item=this.productToItem(item);
      }
      cart.items=this.addOrUpdateItem(cart.items,item,quantity);
      this.setCart(cart);

    }

    removeItemFromCart(productId: number, quantity = 1) {
      const cart = this.cart();
      if (!cart) return;
      const index = cart.items.findIndex(i => i.productId === productId);
      if (index !== -1) {
        if (cart.items[index].quantity > quantity) {
          cart.items[index].quantity -= quantity;
        } else {
          cart.items.splice(index, 1);
        }if (cart.items.length === 0) {
          this.deleteCart();

        } else {
          this.setCart(cart);
        }
      }
    }
    deleteCart() {
      this.http.delete(this.baseUrl + 'cart?id=' + this.cart()?.id).subscribe({
        next: () => {
          localStorage.removeItem('cart_id');
          this.cart.set(null);
        }
      });
    }




    private addOrUpdateItem(items: CartItem[], item: CartItem , quantity: number): CartItem[] {
      const index=items.findIndex(x=>x.productId===item.productId);
      if(index===-1){
        item.quantity=quantity;
        items.push(item);
      }else
        items[index].quantity+=quantity;
      return items;


    }
    isProduct(item: CartItem | Product) :item is Product{
      return (item as Product).id !==undefined;
    }
    private createCart(): Cart  {
      const cart =new Cart();
      localStorage.setItem('cart_id',cart.id);
      return cart;

    }
    private productToItem(item: Product): CartItem  {
      return {
        productId:item.id,
        productName:item.name,
        price:item.price,
        quantity:item.quantityInStock,
        pictureUrl:item.pictureUrl,
        brand:item.brand,
        type:item.brand

      }
    }
}


