import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './profile/profile.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SettingRoutingModule } from './setting-routing.modules';
import { SettingHomeComponent } from './setting-home/setting-home.component';



@NgModule({
  declarations: [AccountComponent,ProfileComponent,FavoritesComponent,SettingHomeComponent],
  imports: [CommonModule,RouterModule ,SettingRoutingModule],
  exports:[SettingHomeComponent]
})
export class SettingModule { }
