import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartitems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new  Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem) {
    let alreayExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartitems.length > 0) {
      
      existingCartItem = this.cartitems.find( tempCartItem => tempCartItem.id == theCartItem.id );

      alreayExistsInCart = (existingCartItem != undefined);
    }

    if (alreayExistsInCart) {
      existingCartItem.quantity++;
    } else {
      this.cartitems.push(theCartItem);
    }
    this.computeCartTotals();
  }
  
  computeCartTotals() {
    
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let currentCartItem of this.cartitems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    
    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('contents of the cart');
    for(let tempCartItem of this.cartitems) {
      const subTotalPrice= tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, subTotalPrice=${subTotalPrice}`);
    }
    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('------');
  }
}
