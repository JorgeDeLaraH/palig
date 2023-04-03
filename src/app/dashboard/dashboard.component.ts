import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { ModalService } from '../_services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  nombre=window.sessionStorage.getItem("nombre");
  id=window.sessionStorage.getItem("Id");
  idcustomer=0;
  modCliente={
    id: 0,
    name: '',
    phone: ''
  }

  mylist: any[]=[];
  ngOnInit(){
    axios.get("http://localhost:8080/dash/"+this.id)
    .then((res)=>{
      this.mylist=[res.data];
      console.log(this.mylist);
    })
    .catch((error)=>{
      console.log(error);
    });

  }
  obtId(id: number){
    this.modCliente.id=this.mylist[0][id].Id;
    this.modCliente.name=this.mylist[0][id].name;
    this.modCliente.phone=this.mylist[0][id].phone;
  }
  obtName(event: Event){
    var e=event.target as HTMLInputElement;
    this.modCliente.name=e.value;
  }
  obtPhone(event: Event){
    var e=event.target as HTMLInputElement;
    this.modCliente.phone=e.value;
  }
  updateClient(){
    axios.post("http://localhost:8080/updateClient",this.modCliente)
    .then((res)=>{
      alert("Cliente Actualizado");
      console.log(res);
      this.ngOnInit();
    })
    .catch((err)=>{
      console.log(err);
    });

  }
  eliminar(){
    axios.delete("http://localhost:8080/delete/"+this.modCliente.id)
    .then((res)=>{
      alert("Cliente eliminado");
      this.ngOnInit();
    })
    .catch((error)=>{
      console.log(error);
    });

  }
  constructor (protected modalService: ModalService){}
}
