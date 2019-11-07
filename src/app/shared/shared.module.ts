import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgxChartsModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        NgxChartsModule
    ],
    declarations: []
})

export class SharedModule {}

