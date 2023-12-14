import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { NumberValueAccessor } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {
  urlLogin = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAlMdNslRoMVRku-eqfW7xbtvBNjvufTG8";
  urlRegister = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAlMdNslRoMVRku-eqfW7xbtvBNjvufTG8";
  constructor(private http: HttpClient) { }
  
  url = "https://firestore.googleapis.com/v1/projects/my-first-project-3f9e9/databases/(default)/documents/"

  login(email:string, pass:string){ //funcion
   return this.http.post(this.urlLogin, {email:email,password:pass,returnSecureToken:true})
  }
  register(email:string, pass:string){ //funcion
    return this.http.post(this.urlRegister, {email:email,password:pass,returnSecureToken:true})

   }

   getAllPreguntas(){
    return this.http.get<any>(this.url + "preguntas?pageSize=1000")
   }

   getAllComida(){
    return this.http.get<any>(this.url + "bebidas?pageSize=1000")
   }

   createPregunta(pregunta: string, correo:string,categoria:string,mesa:string,fecha:string){
    
    const newDoc ={
      fields:{
        pregunta:{stringValue:pregunta},
        correo:{stringValue:correo},
        categoria:{stringValue:categoria},
        mesa:{stringValue:mesa},
        fecha:{timestampValue:fecha},
      }
    }
    return this.http.post(this.url + "preguntas",newDoc);
   }

   createComida(nombre: string, descripcion:string,categoria:string,precio:number){
    
    const newDoc ={
      fields:{
        nombre:{stringValue:nombre},
        descripcion:{stringValue:descripcion},
        categoria:{stringValue:categoria},
        precio:{NumberValue:precio},
      }
    }
    
    return this.http.post(this.url + "bebidas",newDoc);
   }

   deletePregunta(id:string){
    return this.http.delete(this.url + "preguntas/" + id)
   }
   deleteComida(id:string){
    return this.http.delete(this.url + "bebidas/" + id)
   }
  }

