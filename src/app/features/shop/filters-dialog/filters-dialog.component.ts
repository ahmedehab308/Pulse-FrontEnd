import { FormsModule } from '@angular/forms';
import { ShopService } from './../../../core/services/shop.service';
import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDivider} from '@angular/material/divider';
import { MatSelectionList, MatListOption} from '@angular/material/list';

@Component({
  selector: 'app-filters-dialog',
  imports: [
    MatSelectionList,
    MatListOption,
    MatButton,
    FormsModule,
  ],
  templateUrl: './filters-dialog.component.html',
  styleUrl: './filters-dialog.component.scss'
})
export class FiltersDialogComponent {
  ShopService: ShopService=inject(ShopService);
  private dialogRef = inject(MatDialogRef<FiltersDialogComponent>) ;
  private listData = inject(MAT_DIALOG_DATA) ;

  selectedBrands: string[]=this.listData.selectedBrands;
  selectedTypes: string[]=this.listData.selectedTypes;

  applyFilters() {
    this.dialogRef.close({
      selectedBrands: this.selectedBrands,
      selectedTypes: this.selectedTypes
    });
  }

}
