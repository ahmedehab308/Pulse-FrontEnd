import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SnackbarService } from '../services/snackbar.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CartService } from '../services/cart.service';

export const cartEmptyGuard: CanActivateFn = (route, state) => {
  const cartService = inject(CartService);
  const router = inject(Router);
  const snack = inject(SnackbarService);

  if (!cartService.cart() || cartService.cart()?.items.length === 0) {
    snack.Error('Your cart is empty');
    router.navigateByUrl('/cart');
    return false;
  }
  return true;
};
