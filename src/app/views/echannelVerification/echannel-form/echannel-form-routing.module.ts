import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EchannelFormComponent } from './echannel-form.component';

const routes: Routes = [{ path: '', component: EchannelFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EchannelFormRoutingModule { }
