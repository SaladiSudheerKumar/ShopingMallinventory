import { Component,OnInit,ViewChild,ElementRef,NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import {ShoppingService} from '../../shared/services/shopping.service';
import {FormBuilder,FormGroup,FormControl,Validators} from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-shop',
  templateUrl: './add-shop.component.html',
  styleUrls: ['./add-shop.component.css']
})
export class AddShopComponent implements OnInit {
  
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

    this.addShopForm=this.fb.group({
    
      shopName:['',[Validators.required, Validators.minLength(4)]],
      shopCategory:['',Validators.required],
      ownerName:['',[Validators.required, Validators.minLength(4)]],
      address:['',Validators.required],
      longitude:[''],
      latitude:[''],
      id:[],

     });

     this.categories = [
      { key: 'Shop', value: 'Medical Shop' },
      { key: 'Malls', value: 'Malls' },
      { key: 'Hospital', value: 'Hospital' },
      { key:  'Hotel', value:'Hotel'}
        ];


       
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


        onSubmit(){
         
          this.addShopForm.get('latitude').setValue(this.latitude);
          this.addShopForm.get('longitude').setValue(this.longitude);
          console.log(this.addShopForm.value);
          this.shoppingService.addShop(this.addShopForm.value).then(res=>{res=res;
            this.router.navigate(['/HomePage']);
            err=>console.log('failed to load');
          });
        }


        changeCategory(value){
          this.addShopForm.get('shopCategory').setValue(value);
          console.log(this.addShopForm.value)
        }
   
}
