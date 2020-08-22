import { Component,OnInit,ViewChild,ElementRef,NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import {ShoppingService} from './shared/services/shopping.service';
import {FormBuilder,FormGroup,FormControl,Validators} from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ShoppingMall-UI';
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


  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private shoppingService:ShoppingService,
    private modalService: NgbModal,
    private fb:FormBuilder
  ) { }


  ngOnInit() {
    
    this.moduleName='list';
    this.addShopForm=this.fb.group({
    
      shopName:['',Validators.required],
      shopCategory:['',Validators.required],
      ownerName:['',Validators.required],
      address:['',Validators.required],
      longitude:[''],
      latitude:[''],
      id:[],

     });

     this.categories = [
      { key: 'Shop', value: 'Medical Shop' },
      { key: 'Malls', value: 'Malls' },
      { key: 'Hospital', value: 'Hospital' },
     
        ];

        this.shoppingService.getShops().then(res=>{this.data=res; console.log(this.data)});

 
  }

  onSubmit(){
    console.log(this.addShopForm.value);console.log(this.longitude,this.latitude)
    this.addShopForm.get('latitude').setValue(this.latitude);
    this.addShopForm.get('longitude').setValue(this.longitude);
    console.log(this.addShopForm.value);
    this.shoppingService.addShop(this.addShopForm.value).then(res=>{res=res;
      this.shoppingService.getShops().then(res=>{this.data=res; console.log(this.data)});
      this.moduleName='list';
    });
  }

  


  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  changeCategory(value){
    this.addShopForm.get('shopCategory').setValue(value);
    console.log(this.addShopForm.value)
  }

  updateRecord(id){
  console.log(id)
  }
  action(value){
  console.log(value);
  this.stateValue=value;
  
  }

  setState(value){
  this.moduleName=value;
  if(value=='list'){
   this.ngOnInit();
  }
  if(value =='addShop'){
    this.loadMaps();
   }
   }

  update(id){
     console.log(id);
     this.loadMaps();
     this.moduleName='updateShop';
     this.shoppingService.getShop(id).then(res=>{res=res;this.addShopForm.setValue(res);console.log(this.addShopForm.value,res);});
     
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
      this.shoppingService.getShops().then(res=>{this.data=res; console.log(this.data)});
      this.moduleName='list';
    });
  }

  cancel(){
    this.moduleName='list';
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
  

  loadMaps(){
   
    this.mapsAPILoader.load().then(() => {
     this.setCurrentLocation();
     this.geoCoder = new google.maps.Geocoder;
 
     let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
     autocomplete.addListener("place_changed", () => {
       this.ngZone.run(() => {
         //get the place result
         let place: google.maps.places.PlaceResult = autocomplete.getPlace();
 
         //verify result
         if (place.geometry === undefined || place.geometry === null) {
           return;
         }
 
         //set latitude, longitude and zoom
         this.latitude = place.geometry.location.lat();
         this.longitude = place.geometry.location.lng();
         this.zoom = 12;
       });
     });
   });
  }
// Get Current Location Coordinates
setCurrentLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.zoom = 8;
      this.getAddress(this.latitude, this.longitude);
    });
  }
}

  getALLHotals(){
    this.setCurrentLocation();
  }

  nearBy(){
    this.moduleName='list';
    let filtered: any[]=[];
    
      
      this.shoppingService.getShops().then(res=>{this.nearData=res;
         for(var i=0;i<this.nearData.length;i++){
            if((this.nearData[i].longitude -this.longitude) >0.00200){
              filtered.push(this.nearData[i]);
            }
         }


      });this.data=filtered;
      console.log(filtered)
  
  }
  
}
