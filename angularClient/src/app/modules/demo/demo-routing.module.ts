import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { DirectiveDemoComponent } from "./directive-demo/directive-demo.component";
import { ObservableDemoComponent } from "./observable-demo/observable-demo.component";
import { DemoHomeComponent } from "./demo-home/demo-home.component";

const DEMO_ROUTES: Route[] = [
  {
    path: "", component: DemoHomeComponent, children: [
      { path: "directive", component: DirectiveDemoComponent },
      { path: "observable", component: ObservableDemoComponent },
      { path: "", redirectTo: "observable", pathMatch: "full" } 
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(DEMO_ROUTES)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
