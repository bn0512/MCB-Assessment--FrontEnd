import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EchannelFormRoutingModule } from './echannel-form-routing.module';
import { EchannelFormComponent } from './echannel-form.component';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { NgSelectModule } from '@ng-select/ng-select';
import { PdfViewerModule } from 'ng2-pdf-viewer';
@NgModule({
  declarations: [
    EchannelFormComponent
  ],
  imports: [
    CommonModule,
    EchannelFormRoutingModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    NgSelectModule,
    PdfViewerModule
  ]
})
export class EchannelFormModule { }
