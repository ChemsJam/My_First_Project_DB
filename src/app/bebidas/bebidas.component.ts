import { Component } from '@angular/core';
import { ApiRestService } from '../api-rest.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-bebidas',
  templateUrl: './bebidas.component.html',
  styleUrls: ['./bebidas.component.css']
})
export class BebidasComponent {
  comidas = [
    {no : 0,nombre: 'No hay', descripcion:"Pues no hay!", categoria:"",precio: 0,id:""},
  ];
  newC = {nombre: "", descripcion: "", categoria: "", precio: 0, id: "" }
  mod = {nombre: "", descripcion: "", categoria: "", precio: 0, id: "" }

  constructor(private api: ApiRestService,private router:Router){}

  ngOnInit(): void{//despues de construir todo se pone esto para consultar los datos con el servidor
    
    this.consultar()
  }
  regresar(){
    this.router.navigate(['/home']);
  }
  consultar(){
    this.api.getAllComida().subscribe({
      next: datos => {
        console.log(datos)
        let documentos = datos.documents.filter((c:any) => c.hasOwnProperty('fields')) // let es para declarar variables
        let i = 1;
        let comidas = documentos.map( (c:{name:string,fields:any} ) => ({
          no: i++,
          nombre: c.fields.hasOwnProperty('nombre')? c.fields.nombre.stringValue: "",
          descripcion: c.fields.hasOwnProperty('descripcion')? c.fields.descripcion.stringValue: "",
          precio: c.fields.hasOwnProperty('precio')? c.fields.precio.stringValue: "",
          categoria: c.fields.hasOwnProperty('categoria')? c.fields.categoria.stringValue: "",
          id: c.name.split("/").pop()
      }))
        console.log(comidas)
        this.comidas = comidas
      },
      error: e => {}
    })
  }

  

  crearComida(){
    if(this.newC.nombre=="" || this.newC.categoria==""|| this.newC.descripcion=="" ){
      alert("Falta llenar los datos")
      return;
    }
    this.api.createComida(this.newC.categoria,this.newC.descripcion,this.newC.nombre, this.newC.precio).subscribe({
      next: resp => {this.consultar()},
      error: e => {console.log(e)}
    })
  }

  eliminarComida(id:string){
    this.api.deleteComida(id).subscribe({
      next: resp => {this.consultar()},
      error :e => {console.log(e)}
    })
  }
  modificarComida(){

  }
  editarComida(c  :any){
    this.mod = c
  }
}
