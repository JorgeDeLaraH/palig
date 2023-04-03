import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent {
  idAgent=window.sessionStorage.getItem("Id");
  newClient={
    idAg: this.idAgent,
    name: '',
    phone: '',
    age: 0,
    monto: 0.0,
    total: 0.0,
    tipo: ''
  }
  obtName(event: Event){
    var e=event.target as HTMLInputElement;
    this.newClient.name=e.value;
  }
  obtPhone(event: Event){
    var e=event.target as HTMLInputElement;
    this.newClient.phone=e.value;
  }
  obtAge(event: Event){
    var e=event.target as HTMLInputElement;
    this.newClient.age=parseFloat(e.value);
  }
  obtMonto(event: Event){
    var e=event.target as HTMLInputElement;
    this.newClient.monto=Number(e.value);
  }
  obtSel(event: Event){
    var e=event.target as HTMLSelectElement;
    this.newClient.tipo=e.value;
  }

  todo(){
    axios.get("http://localhost:8080/mortalidad/"+this.newClient.age)
    .then((res)=>{
      let r=this.newClient.monto;
      let mx=res.data[0].mx;
      let nx=res.data[0].nx;
      let dx=res.data[0].dx;
      //prima permanente
      if(this.newClient.tipo=='0001'){
        this.newClient.total=r*(mx/dx);
        //Sesion storage
        axios.post("http://localhost:8080/newClient", this.newClient)
        .then((res)=>{
          alert("cliente creado");
          console.log(res);
          window.sessionStorage.setItem("namePdf", this.newClient.name);
          window.sessionStorage.setItem("plazo", "12");
          window.sessionStorage.setItem("monto", String(this.newClient.monto));
          window.sessionStorage.setItem("total",String(this.newClient.total));
          document.location.href="/pdf";
        })
        .catch((err)=>{
        });
      }
      else{
        if(this.newClient.tipo=='0002'){
          let newAge=this.newClient.age+12;
          axios.get("http://localhost:8080/mortalidad/"+newAge)
          .then((res)=>{
            let mxn=res.data[0].mx;
            let nxn=res.data[0].nx;
            this.newClient.total=r*((mx-mxn)/(nx-nxn));

            axios.post("http://localhost:8080/newClient", this.newClient)
            .then((res)=>{
            alert("cliente creado");
            window.sessionStorage.setItem("namePdf", this.newClient.name);
          window.sessionStorage.setItem("plazo", "Mensualidad de por vida");
          window.sessionStorage.setItem("monto", String(this.newClient.monto));
          window.sessionStorage.setItem("total",String(this.newClient.total));
              document.location.href="/pdf";
            console.log(res);
             })
            .catch((err)=>{
            });

          });
        }
        else{
          alert("tipo no encontrado");
        }
      }
    });

  }
}
