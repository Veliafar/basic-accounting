import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { RegestrationComponent } from './regestration/regestration.component';
import {AuthComponent} from './auth.component';


@NgModule({
    declarations: [
        LoginComponent,
        RegestrationComponent,
        AuthComponent
    ],
    imports: [
        CommonModule
    ]
})
export class AuthModule { }