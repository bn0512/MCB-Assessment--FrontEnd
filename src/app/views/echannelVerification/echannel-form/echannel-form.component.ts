import { Component , OnInit , ViewChild} from '@angular/core'; 
import {echannelFormService} from './echannel-form.service';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { Router,ActivatedRoute  } from '@angular/router';
//import {Echannel_Verification} from ""
import Swal from 'sweetalert2';
@Component({
  selector: 'app-echannel-form',
  templateUrl: './echannel-form.component.html',
  styleUrls: ['./echannel-form.component.scss']
})
export class EchannelFormComponent implements OnInit{
  constructor(public EchannelformService:echannelFormService, private snapshot: ActivatedRoute,public route:Router) { }
  public userData : any = FormGroup; 
  public id : string | null = this.snapshot.snapshot.paramMap.get('id');
  public assignedId : string | null = this.snapshot.snapshot.paramMap.get('assigned');
  public roles : any = ["SuperUser","Admin","CEO"]
  public submitted = false;
  
  public outcomeOptions:any;
  public UpdateData :any;
  public outComeId :any;
  src = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  ngOnInit(): void {
    console.log("assignedId",this.assignedId)
    this.EchannelformService.outcomeslist().then((response : any)=>{
      console.log("outcomeslist",response);
      let arr1:any = [];
      response.data.map((mapData:any)=>{
      arr1.push({id:mapData.id,name:mapData.name})
    })
    this.outcomeOptions = arr1;
    }).catch(err=>{
      console.log(err);
  })
    this.userData = new FormGroup({
      'reference': new FormControl(null, Validators.required),
        'currency'   : new FormControl(null, Validators.required),
       'amount'   : new FormControl(null, Validators.required),
       'accountNo' : new FormControl(null, Validators.required),
       'debitCurrency': new FormControl(null, Validators.required),
        'debitName': new FormControl(null, Validators.required),
        'beneficiaryName': new FormControl(null, Validators.required),
        'custInfoMkr': new FormControl(null, Validators.required),
       'accountInfoMkr': new FormControl(null, Validators.required),
        'outcomeSelect': new FormControl(null, Validators.required),
        'extension': new FormControl(null, Validators.required),
        'contactPerson': new FormControl(null, Validators.required),
        'customerCalledOn': new FormControl(null, Validators.required),
        'comment': new FormControl(null, Validators.required),
      //  'debitCurrency': new FormControl(null, Validators.required),


     })



      
    this.EchannelformService.eventSourcesGetById(this.id).then((res)=>{
     console.log('reee',{id:res.data.outCome.id,name:res.data.outCome.name},res.data)
      this.userData.setValue ({
        'reference': res.data.sourceBu,
        'currency' :res.data.transactionCurrency,
        'amount':res.data.transactionAmount,
         'accountNo':res.data.debitAccountNumber,
         'debitCurrency':res.data.transactionCurrency,
         'debitName':res.data.accountName,
         'beneficiaryName':res.data.accountName,
          'custInfoMkr':res.data.custInfoMkr,
          'accountInfoMkr':res.data.accountName,
          'outcomeSelect':{id:res.data.outCome.id,name:res.data.outCome.name},
          'extension':res.data.extension,
          'contactPerson':res.data.contactPerson,
          'customerCalledOn':res.data.customerCalledOn,
          'comment':res.data.comment,
      })
      this.outComeId=res.data.outCome.id
      this.UpdateData={
        "businessKey": res.data.businessKey,
        "priority": res.data.priority,
        "sourceBu": res.data.sourceBu,
        "dcpReference":res.data.dcpReference,
        "accountName": res.data.accountName,
        "transactionCurrency": res.data.transactionCurrency,
        "transactionAmount":res.data.transactionAmount,
        "lockedBy": res.data.lockedBy,
        "debitAccountNumber": res.data.debitAccountNumber,
        "accountCurrency": res.data.accountCurrency,
        "beneficiaryName": res.data.beneficiaryName,
        "custInfoMkr": res.data.custInfoMkr,
        "accountInfoMkr": res.data.accountInfoMkr,
        "extension":res.data.extension,
        "contactPerson": res.data.contactPerson,
        "customerCalledOn": res.data.customerCalledOn,
        "comment":res.data.comment,
    }
    }).catch(err=>{
     console.log(err.response)
   })
   }
   onSubmit(){
    this.submitted = true;
    console.log("this.userData.value",this.userData.value)
   }
   proceedHandle=()=>{
    console.log("p",this.UpdateData);
    this.EchannelformService.proceedUpdate(this.outComeId,this.id,this.UpdateData).then((res)=>{
      console.log(res);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Proceed Success',
        showConfirmButton: false,
        timer: 1500
      });
       this.route.navigate(["echannelData"])
    }).catch(err=>{console.log(err)})

   }
   rejectHandle=()=>{
     
    this.EchannelformService.rejectUpdate(this.outComeId,this.id,this.UpdateData).then((res)=>{
      console.log(res);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Reject Success',
        showConfirmButton: false,
        timer: 1500
      });
       this.route.navigate(["echannelData"])
    }).catch(err=>{console.log(err)})
   }
}
