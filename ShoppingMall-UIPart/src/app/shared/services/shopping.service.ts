import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  serverendpoint="http://localhost:8080";
  constructor(private httpClient: HttpClient) { }


  public  getShops(){
    return this.httpClient.get(this.serverendpoint+'/allShops').toPromise().then(res=>res);
  }

  public  getShop(id){
    return this.httpClient.get(this.serverendpoint+'/getShop/'+id).toPromise().then(res=>res);
  }

  public  addShop(obj){
    return this.httpClient.post(this.serverendpoint+'/addShop',obj).toPromise().then(res=>res);
  }

  public  deleteShop(id){
    return this.httpClient.get(this.serverendpoint+'/delete/'+id).toPromise().then(res=>res);
  }
}
