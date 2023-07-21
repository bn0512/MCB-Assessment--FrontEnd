import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EchannelDataComponent } from './echannel-data.component';

const routes: Routes = [{ path: '', component: EchannelDataComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EchannelDataRoutingModule { }
