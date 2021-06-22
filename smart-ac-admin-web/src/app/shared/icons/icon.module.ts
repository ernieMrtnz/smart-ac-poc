import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";

import { InputClearIconComponent } from "./input-clear-icon.component";
import { MenuIconDropdownComponent } from "./menu-icon-dropdown.component";
import { HintIconComponent } from "./hint-icon.component";
import { ArrowBackIconComponent } from "./arrow-back-icon.component";
import { SaveIconComponent } from "./save-icon-component";
import { CancelIconComponent } from "./cancel-icon-component";

let components = [
    InputClearIconComponent,
    MenuIconDropdownComponent,
    HintIconComponent,
    ArrowBackIconComponent,
    SaveIconComponent,
    CancelIconComponent,
];

@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatTooltipModule,
    ],
    declarations: components,
    exports: components,
})
export class IconModule {}
