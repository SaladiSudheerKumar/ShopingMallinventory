import { Component,OnInit,ViewChild,ElementRef,NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import {ShoppingService} from '../shared/services/shopping.service';
import {FormBuilder,FormGroup,FormControl,Validators} from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shops-list',
  templateUrl: './shops-list.component.html',
  styleUrls: ['./shops-list.component.css']
})
export class ShopsListComponent implements OnInit {
  

 
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  data:any;
  addShopForm:FormGroup;
  shopName:string;
  ownerName:string;
  categories:any;
  stateValue:any;
  moduleName:string;
  closeResult:string;
  nearData:any;
  id:any;
  @ViewChild('search')
  public searchElementRef: ElementRef;
  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private shoppingService:ShoppingService,
    private modalService: NgbModal,
    private router:Router,
    private fb:FormBuilder) { }

  ngOnInit(): void {
  this.shoppingService.getShops().then(res=>{this.data=res});

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

  update(id){
   this.router.navigate(['updateShop',id]);
  }

  searchByName(value){
  this.shoppingService.getShops().then(res=>{this.data=this.filterByName(value,res);
  });
  }
  filterByName(value,res){

    let filtered: any[]=[];
    for(let i=0;i<res.length;i++){
        let filter =res[i];
      
       if(filter.shopName.toLowerCase().indexOf(value.toLowerCase()) == 0){
         filtered.push(filter);
       }
     

   }
 return filtered;

  }
}
