import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {ShopsListComponent} from './shops-list/shops-list.component';
import {AddShopComponent} from './shops-list/add-shop/add-shop.component';
import {UpdateShopComponent} from './shops-list/update-shop/update-shop.component';
import {NearyByComponent} from './shops-list/neary-by/neary-by.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/HomePage',
    pathMatch: 'full'
},
{path:'HomePage', component: ShopsListComponent},
{path:'shopsList', component:ShopsListComponent},
{path: 'addShop', component:AddShopComponent},
{path: 'updateShop/:id',component:UpdateShopComponent},
{path: 'nearBy', component:NearyByComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
