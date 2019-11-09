import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgxChartsModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        NgxChartsModule,
        LoaderComponent
    ],
    declarations: [LoaderComponent]
})

export class SharedModule {}

