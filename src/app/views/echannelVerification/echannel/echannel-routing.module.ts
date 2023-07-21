import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EchannelComponent } from './echannel.component';

const routes: Routes = [{ path: '', component: EchannelComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EchannelRoutingModule { }
