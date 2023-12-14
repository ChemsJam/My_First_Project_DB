import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRestService } from '../api-rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
   comidas = [
    {no : 0,nombre: 'No hay', descripcion:"Pues no hay!", categoria:"",precio: 0,id:""},
  ];

  preguntas = [
    {no: 1, pregunta: 'No hay', correo:"",categoria:"",fecha:"",mesa:"",id:""},
  ];
  newP = {categoria:"", pregunta:"", mesa:""}
  mod = {categoria:"", pregunta:"",mesa:""}

  constructor(private api: ApiRestService, private router: Router){}

  ngOnInit(): void{//despues de construir todo se pone esto para consultar los datos con el servidor
    this.consultarcomida()
    this.consultar()
    
  }

  crearComida(){
    this.router.navigate(['/bebidas']);
  }
  salir(){
    this.router.navigate(['/login']);
  }
  consultarcomida(){
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
          mesa: c.fields.hasOwnProperty('mesa')? c.fields.mesa.stringValue: "",
          id: c.name.split("/").pop()
      }))
        console.log(comidas)
        this.comidas = comidas
      },
      error: e => {}
    })
  }

  consultar(){
    this.api.getAllPreguntas().subscribe({
      next: datos => {
        console.log(datos)
        let documentos = datos.documents.filter((d:any) => d.hasOwnProperty('fields')) // let es para declarar variables
        let i = 1;
        let preguntas = documentos.map( (p:{name:string,fields:any} ) => ({
          no: i++,
          pregunta: p.fields.hasOwnProperty('pregunta')? p.fields.pregunta.stringValue: "",
          correo: p.fields.hasOwnProperty('correo')? p.fields.correo.stringValue: "",
          categoria: p.fields.hasOwnProperty('categoria')? p.fields.categoria.stringValue: "",
          mesa: p.fields.hasOwnProperty('mesa')? p.fields.mesa.stringValue: "",
          fecha: p.fields.hasOwnProperty('fecha')? p.fields.fecha.timestampValue: "",
          id: p.name.split("/").pop()
      }))
        console.log(preguntas)
        this.preguntas = preguntas
      },
      error: e => {}
    })
  }
  crearPregunta(){
    const fecha = new Date().toISOString();
    if(this.newP.pregunta=="" || this.newP.categoria==""){
      alert("Falta llenar los datos")
      return;
    }
    const correo = localStorage.getItem("correo") || "" //este es un if
    this.api.createPregunta(this.newP.pregunta,correo,this.newP.categoria,this.newP.mesa, fecha).subscribe({
      next: resp => {this.consultar()},
      error: e => {console.log(e)}
    })
  }

  eliminarPregunta(id:string){
    this.api.deletePregunta(id).subscribe({
      next: resp => {this.consultar()},
      error :e => {console.log(e)}
    })
  }
  modificarPregunta(){

  }
  editarPregunta(p:any){
    this.mod = p
  }
}
