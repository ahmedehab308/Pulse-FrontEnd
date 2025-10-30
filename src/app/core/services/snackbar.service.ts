import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  private snackbar= inject(MatSnackBar);

  Error(msg :string){
    this.snackbar.open(msg,'x',{
      duration:3000,
      panelClass:['snack-error']
    })
  }

  Success(msg :string){
    this.snackbar.open(msg,'x',{
      duration:3000,
      panelClass:['snack-success']
    })
  }

}
