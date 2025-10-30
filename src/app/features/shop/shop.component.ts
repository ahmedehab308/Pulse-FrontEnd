import { shopParams } from './../../shared/models/shopParams';
import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../core/services/shop.service';
import { Product } from '../../shared/models/product';
import { ProductItemComponent } from './product-item/product-item.component';
import { MatDialog } from '@angular/material/dialog';
import { FiltersDialogComponent } from './filters-dialog/filters-dialog.component';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { pagination } from '../../shared/models/pagination';
import { FormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-shop',
  imports: [ProductItemComponent,
    MatButton, MatIcon, MatMenu, MatSelectionList,
    MatListOption, MatMenuTrigger, MatPaginator, FormsModule, MatIconButton,MatProgressSpinnerModule
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit{

  private ShopService:ShopService=inject(ShopService);
  private dialogService =inject(MatDialog)
  products?:pagination<Product>;

  sortOptions=[
    {name:'Alphabetical',value:'name'},
    {name:'Price: Low to High',value:'priceAsc'},
    {name:'Price: High to Low',value:'priceDesc'},
  ]
  shopParams=new shopParams();
  pageSizeOptions=[5,10,20];

  ngOnInit(): void {
     this.InitializeShop();

  }

  InitializeShop(){
    this.getProducts();
    this.ShopService.getbrands();
    this.ShopService.gettypes();
  }

  getProducts() {
    this.ShopService.getProducts(this.shopParams).subscribe({
      next: response => this.products = response ,
      error: error => console.log(error),
      complete: () => console.log('Request completed')
    });
  }

  onSearchChange(event:any){
    this.shopParams.pageIndex=1;
    // this.shopParams.search=event.target.value;
    console.log(this.shopParams.search);
    this.getProducts();
  }

  handlePageEvent(event: any) {
    this.shopParams.pageIndex = event.pageIndex + 1;
    this.shopParams.pageSize = event.pageSize;
    this.getProducts();
  }


   onSortChange(event: MatSelectionListChange) {
      const selectedOption = event.options[0];
      if (selectedOption) {
        this.shopParams.sort = selectedOption.value;
        this.shopParams.pageIndex = 1;

        this.getProducts();

      }
    }

  openFiltersDialog() {
    const dialogRef = this.dialogService.open(FiltersDialogComponent, {
      minWidth: '500px',
      data: {
        selectedBrands: this.shopParams.brands,
        selectedTypes: this.shopParams.types,
      }
    });

    dialogRef.afterClosed().subscribe({
      next: result => {
        if (result) {
          this.shopParams.brands = result.selectedBrands;
          this.shopParams.types = result.selectedTypes;
          this.shopParams.pageIndex = 1;
          // apply filters
          this.getProducts();

        }
      }
    });
  }

}
