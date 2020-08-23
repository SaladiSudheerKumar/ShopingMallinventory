import { Component } from '@angular/core';
import {ShoppingService} from './shared/services/shopping.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ShoopingMall-UI';
  
   data:any;
  constructor(private shoppingService:ShoppingService){}


  ngOnInit(){
    this.shoppingService.getShops().then(res=>{this.data=res});
  }

  
}
