import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AccountComponent } from "./account/account.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { ProfileComponent } from "./profile/profile.component";
import { SettingHomeComponent } from "./setting-home/setting-home.component";

const SETTING_ROUTES: Route[] = [
    {
        path: "", component: SettingHomeComponent, children: [
            { path: "account", component: AccountComponent },
            { path: "favorites", component: FavoritesComponent },
            { path: "profile", component: ProfileComponent },
            { path: "", redirectTo: "account", pathMatch: "full" }  // הוספת נתיב ברירת מחדל
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(SETTING_ROUTES)],
    exports: [RouterModule]
})
export class SettingRoutingModule { }
