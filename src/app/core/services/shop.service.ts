import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { pagination } from '../../shared/models/pagination';
import { shopParams } from '../../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService  {

  baseUrl='https://localhost:5001/api/';
  private http: HttpClient=inject(HttpClient);
  types:string[]=[];
  brands:string[]=[];







  getProducts(shopParams:shopParams){
    let params=new HttpParams();
    if(shopParams.brands&&shopParams.brands.length>0) params=params.append('brands',shopParams.brands.join(','));
    if(shopParams.types&&shopParams.types.length>0) params=params.append('types',shopParams.types.join(','));
    if(shopParams.sort) params=params.append('sort',shopParams.sort);
    if(shopParams.search) params=params.append('search',shopParams.search);
    params=params.append('pageSize',shopParams.pageSize);
    params=params.append('pageIndex',shopParams.pageIndex);

    return this.http.get<pagination<Product>>(this.baseUrl+'products',{params});
  }

  getProduct(id:number){
    return this.http.get<Product>(this.baseUrl+'products/'+id);
  }

  getbrands(){
    if(this.brands.length>0) return;
    return this.http.get<string[]>(this.baseUrl+'products/brands').subscribe(response=>{
      this.brands=response;
    });
  }

  gettypes(){
    if(this.types.length>0) return;
    return this.http.get<string[]>(this.baseUrl+'products/types').subscribe(response=>{
      this.types=response;
    });
  }

}
