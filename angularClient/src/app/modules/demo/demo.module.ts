import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ObservableDemoComponent } from "./observable-demo/observable-demo.component";
import { DirectiveDemoComponent } from "./directive-demo/directive-demo.component";
import { DemoRoutingModule } from "./demo-routing.module";
import { HighLightDirective } from "./directive-demo/highlight.directive";
import { DemoHomeComponent } from "./demo-home/demo-home.component";
import { RouterModule } from "@angular/router"; 
@NgModule({
    declarations:[ObservableDemoComponent, DirectiveDemoComponent, HighLightDirective, DemoHomeComponent],
    imports:[CommonModule, RouterModule, DemoRoutingModule], 
    exports:[]
})
export class DemoModule { }
