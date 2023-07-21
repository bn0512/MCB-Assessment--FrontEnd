import { Component , OnInit , ViewChild} from '@angular/core';

import { MatPaginator } from '@angular/material/paginator'; 
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import {echannelService} from './echannel.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {SelectionModel} from '@angular/cdk/collections';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import Swal from 'sweetalert2';
export interface GetAllElements{
  id:any,
  sno:any,
  priority:any,
  sourceBu:any,
  dcpReference:any,
  accountName:any,
  transactionCurrency:any,
  transactionAmount:any,
   businessKey:any,
  lockedBy:any
}
 
export interface AssignedElements{
  id:any,
  sno:any,
  priority:any,
  sourceBu:any,
  dcpReference:any,
  accountName:any,
  transactionCurrency:any,
  transactionAmount:any,
   businessKey:any,
  lockedBy:any,
  assignedTo:any
}
@Component({
  selector: 'app-echannel',
  templateUrl: './echannel.component.html',
  styleUrls: ['./echannel.component.scss']
})

export class EchannelComponent implements OnInit {
  public dataSource:any=[];
   public checkboxCheckedForOpenButton:any=[];
   public rowselectedList:any=[];
     getAll:string="getAll";
   
   @ViewChild(MatPaginator) paginator :MatPaginator | undefined;
  displayedColumns: any[] = ['select','priority', 'sourceBu', 'dcpReference', 'accountName', 'transactionCurrency','transactionAmount','businessKey','lockedBy'];
    selection = new SelectionModel<GetAllElements>(true, []);
   constructor(public echannelServices:echannelService,public route:Router) { }
   
  ngOnInit(): void {
    this.rowselectedList=[]
    this.tableListData();
    this.getAll="getAll";
    setTimeout(() => {
      this.tableListData();
    }, 500);
  }
 tableListData=async()=>{
  this.dataSource=[];
  await this.echannelServices.eventSourcesList().then((res)=>{
    console.log("res",res)
    let resData:any[] = [];
    res.data.map((mapData:any,index:number)=>{
      resData.push({sno: index + 1, id: mapData.id, priority : mapData.priority,
        sourceBu: mapData.sourceBu, dcpReference: mapData.dcpReference,   accountName: mapData.accountName,
        transactionCurrency: mapData.transactionCurrency,  transactionAmount: mapData.transactionAmount,
        businessKey:mapData.businessKey,lockedBy:mapData.lockedBy
      });
    })
    this.displayedColumns  = ['select','priority', 'sourceBu', 'dcpReference', 'accountName', 'transactionCurrency','transactionAmount','businessKey','lockedBy'];
    this.selection = new SelectionModel<GetAllElements>(true, []);
  
     const ELEMENT_DATA: GetAllElements[] =resData
   this.dataSource = new MatTableDataSource<GetAllElements>(ELEMENT_DATA);
   //this.dataSource=resData
   }).catch(err=>{
    console.log(err.response)
  })
 }

/** Whether the number of selected elements matches the total number of rows. */
isAllSelected = ()=> {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.filteredData.length;
  return numSelected === numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
toggleAllRows() {
  if (this.isAllSelected()) {
    this.selection.clear();
    return;
  }
  this.selection.select(...this.dataSource.data);
}

/** The label for the checkbox on the passed row */
checkboxLabel(row?: GetAllElements): string {
 
  if (!row) {
    return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.sno + 1}`;
}

public selectRow(checkbox: any, row: any){
    let dataa =this.checkboxCheckedForOpenButton
  let selectedRowDisplay = this.rowselectedList;
    if(checkbox.checked){
      dataa.push(row.id);// for open button
      selectedRowDisplay.push(row)//for view only button
      this.rowselectedList=selectedRowDisplay 
    }else{
       // let remove from selceted list
      for (let i = 0; i < dataa.length; i++) { /// for open button
        if(dataa[i]==row.id){
          dataa.splice([i], 1);
        }
      }
     let remove :any=[]
      this.rowselectedList.map((mapData:any,index:number)=>{//for view only button
        console.log(mapData)
        if(mapData.id!==row.id){
          remove.push(mapData)
        }
      })
      this.rowselectedList=remove
    }
    this.checkboxCheckedForOpenButton=dataa
  //   console.log("this.rowselectedList",this.rowselectedList)
  //  console.log("checkboxLabel",checkbox.checked,row)
}
viewHandle(userId:any){
  if(this.getAll=="getAll"){
    this.route.navigate([ "echannel/viewOnly/"+userId+"/new"]);
  }else{
    this.route.navigate([ "echannel/viewOnly/"+userId+"/assigned"]);
  }
 
}
openHandle=()=>{
  this.echannelServices.requestOpen(this.checkboxCheckedForOpenButton).then((res)=>{
    console.log(res);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Changed Successfully',
      showConfirmButton: false,
      timer: 1500
    });
    this.tableListData();
  }).catch(err=>{console.log(err)})
}
viewOnlyHandle=()=>{
  const ELEMENT_DATA: GetAllElements[] =this.rowselectedList
  this.dataSource = new MatTableDataSource<GetAllElements>(ELEMENT_DATA); 
}
assignedHandle=()=>{
 // this.tableListData();
 // this.rowselectedList=[]
 //this.displayedColumns = ['priority', 'sourceBu', 'dcpReference', 'accountName', 'transactionCurrency','transactionAmount','businessKey','lockedBy'];
 this.getAll="assigned";
  
  this.echannelServices.assignedList().then((res)=>{
    console.log("assignedList",res)
    let resData:any[] = [];
    res.data.map((mapData:any,index:number)=>{
      resData.push({sno: index + 1, id: mapData.id, priority : mapData.priority,
        sourceBu: mapData.sourceBu, dcpReference: mapData.dcpReference,   accountName: mapData.accountName,
        transactionCurrency: mapData.transactionCurrency,  transactionAmount: mapData.transactionAmount,
        businessKey:mapData.businessKey,lockedBy:mapData.lockedBy,assignedTo:mapData.userName
      });
    })
    this.displayedColumns  = ['priority', 'sourceBu', 'dcpReference', 'accountName', 'transactionCurrency','transactionAmount','businessKey','lockedBy','assignedTo'];
  //  this.selection = new SelectionModel<GetAllElements>(true, []);
  
   //  const ELEMENT_ASSIGNED_DATA: AssignedElements[] =resData
   this.dataSource = new MatTableDataSource<AssignedElements>(resData);
   //this.dataSource=resData
   }).catch(err=>{
    console.log(err.response)
  })









}
}
