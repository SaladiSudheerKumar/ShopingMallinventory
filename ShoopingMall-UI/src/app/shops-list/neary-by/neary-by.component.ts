import { Component,OnInit } from '@angular/core';
import {ShoppingService} from '../../shared/services/shopping.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Component({
  selector: 'app-neary-by',
  templateUrl: './neary-by.component.html',
  styleUrls: ['./neary-by.component.css']
})
export class NearyByComponent implements OnInit {

  
  
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  data:any;
  
  shopName:string;
  ownerName:string;
  closeResult:string;
  nearByData:any;
  id:any;
   constructor(
    private shoppingService:ShoppingService,
    private modalService: NgbModal,
    private router:Router,
    ) { }

  ngOnInit(): void {
    this.shoppingService.getShops().then(res=>{this.nearByData=res;this.getLocation();});
    
    
  }
 
  
  update(id){
    this.router.navigate(['updateShop',id]);
   }
  

   open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
   delete(content,id){
    this.id=id;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
     this.closeResult = `Closed with: ${result}`;
   }, (reason) => {
     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
   });


  }

  deleteRecord(){
    this.modalService.dismissAll();
     this.shoppingService.deleteShop(this.id).then(res=>{res=res;
      this.shoppingService.getShops().then(res=>{this.data=res});
    });
  }

  getLocation() {
   
     
      navigator.geolocation.getCurrentPosition((position)=> {
           
        let filtered: any[]=[];
     
        

        for(var i=0;i<this.nearByData.length;i++){
          if((this.nearByData[i].longitude -position.coords.longitude) >0.00200){
            filtered.push(this.nearByData[i]); 
          }
       }
       this.data=filtered;console.log(this.data);
     },
     (error)=> {
         console.log("The Locator was denied. :(")
     });
     
   

      }
  
}
