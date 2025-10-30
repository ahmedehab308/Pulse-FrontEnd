import { Route } from "@angular/router";
import { CheckoutSuccessComponent } from "./checkout-success/checkout-success.component";
import { CheckoutComponent } from "./checkout.component";
import { authGuard } from "../../core/guards/auth-guard";
import { orderCompleteGuard } from "../../core/guards/order-complete-guard";
import { cartEmptyGuard } from "../../core/guards/cart-empty-guard";

export const checkoutRoutes: Route[] = [
    {path: '', component: CheckoutComponent, canActivate: [authGuard, cartEmptyGuard]},
    {path: 'success', component: CheckoutSuccessComponent,
        canActivate: [authGuard, orderCompleteGuard]},
]
