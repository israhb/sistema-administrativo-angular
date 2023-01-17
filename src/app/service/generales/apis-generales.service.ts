import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApisGeneralesService {

    constructor(private http: HttpClient) { }

    /********* USUARIOS ************** */
    loginCredentials(json: JSON){
        return this.http.post( environment.baseUrl+'ccLoginAdmin', json, {});
    }
    sendCodeUser(json: JSON){
        return this.http.post( environment.baseUrl+'ccValidaCodigoUsuario', json, {});
    }
    getNivelsUser(json: JSON){
        return this.http.post( environment.baseUrl+'ccObtenerNivelesUsuarios', json, {});
    }
    postListarUsusarios(json: JSON){
        return this.http.post( environment.baseUrl+'ccListarUsusarios', json, {});
    }
    postRegistrarUsuario(json: JSON){
        return this.http.post( environment.baseUrl+'ccRegistrarUsuario', json, {});
    }
    postActualizarUsario(json: JSON){
        return this.http.post( environment.baseUrl+'ccActualizarUsario', json, {});
    }
    postEliminaUsuario(json: JSON){
        return this.http.post( environment.baseUrl+'ccEliminaUsuario', json, {});
    }
    /********* USUARIOS ************** */

    /********* OPERADORES ************** */
    postListarOperadores(json: JSON){
        return this.http.post( environment.baseUrl+'ccListarOperadores', json, {});
    }
    postRegistrarOperador(json: JSON){
        return this.http.post( environment.baseUrl+'ccRegistrarOperador', json, {});
    }
    postActualizarOperador(json: JSON){
        return this.http.post( environment.baseUrl+'ccActualizarOperador', json, {});
    }
    postEliminaOperador(json: JSON){
        return this.http.post( environment.baseUrl+'ccEliminaOperador', json, {});
    }
    /********* OPERADORES ************** */

    /********* COMAPAÑA ************** */
    postListarCampanias(json: JSON){
        return this.http.post( environment.baseUrl+'ccListarCampanias', json, {});
    }
    /********* COMAPAÑA ************** */

    /********* CLIENTES ************** */
    postListarClientes(json: JSON){
        return this.http.post( environment.baseUrl+'ccListarClientes', json, {});
    }
    postRegistrarCliente(json: JSON){
        return this.http.post( environment.baseUrl+'ccRegistrarCliente', json, {});
    }
    postUpdateCliente(json: JSON){
        return this.http.post( environment.baseUrl+'UpdateCliente', json, {});
    }

    /********* CLIENTES ************** */
}
