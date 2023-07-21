import { Component , OnInit , ViewChild} from '@angular/core'; 
import {echannelDataService} from './echannel-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { Router,ActivatedRoute  } from '@angular/router';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
export interface PeriodicElement{
  label:any,
  count:any,
}
 
@Component({
  selector: 'app-echannel-data',
  templateUrl: './echannel-data.component.html',
  styleUrls: ['./echannel-data.component.scss']
})
export class EchannelDataComponent implements OnInit{
  constructor(public EchannelDataService:echannelDataService, private snapshot: ActivatedRoute,public route:Router) { }
   
   
  public notYetCalled:any;
  public callBackSuccessful:any;
  public callBackNotSuccessful:any;
  ngOnInit(): void {
    this.EchannelDataService.dataCountList().then((res)=>{
     console.log("res",res)  
      this.notYetCalled= res.data.notYetCalled;
      this.callBackSuccessful= res.data.callBackSuccessful;
      this.callBackNotSuccessful= res.data.callBackNotSuccessful 
    }).catch(err=>{
     console.log(err.response)
   })
   }
   
}
