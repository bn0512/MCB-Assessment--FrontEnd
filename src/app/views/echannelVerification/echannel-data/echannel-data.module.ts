import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EchannelDataRoutingModule } from './echannel-data-routing.module';
import { EchannelDataComponent } from './echannel-data.component';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule} from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
@NgModule({
  declarations: [
    EchannelDataComponent
  ],
  imports: [
    CommonModule,
    EchannelDataRoutingModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule, MatTableModule
  ]
})
export class EchannelDataModule { }
