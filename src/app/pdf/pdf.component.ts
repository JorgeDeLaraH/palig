import { Component, ViewChild, ElementRef } from '@angular/core';
import * as html2pdf from 'html2pdf.js';
@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent {
  persona={
    idAg: window.sessionStorage.getItem("nombre"),
    name: window.sessionStorage.getItem("namePdf"),
    plazo: window.sessionStorage.getItem("plazo"),
    monto: window.sessionStorage.getItem("monto"),
    total: window.sessionStorage.getItem("total"),
    date: new Date().toLocaleDateString('es-mx', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
  }
  download(){
    var element = document.getElementById('pdfcontainer');
    var opt = {
    margin:       1,
    filename:     "Cotizacion_"+this.persona.name,
    image:        { type: 'jpeg', quality: 1 },
    html2canvas:  { scale: 1 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
};

// New Promise-based usage:
html2pdf().from(element).set(opt).save();
  }
}
