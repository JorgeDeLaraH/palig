import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  persona={
    id: '',
    pass: ''
  }
  nombre='';
  obtId(event: Event){
    var e=event.target as HTMLInputElement;
    this.persona.id=e.value;
  }
  obtPas(event: Event){
    var e=event.target as HTMLInputElement;
    this.persona.pass=e.value;
  }
  login(){
    axios.post('http://localhost:8080/login', this.persona)
    .then((res)=>{
      if(res.data[0] == null){
        console.log("Chinga tu madre 2");
      }
      else{
        document.location.href='dash';
        console.log("lo hiciste muy bien");
        window.sessionStorage.setItem("Id", this.persona.id);
        window.sessionStorage.setItem("nombre", res.data[0].name);
      }
    })
    .catch((err)=>{
      console.log("No mi chavo no sirve we");
    })
  }
}
