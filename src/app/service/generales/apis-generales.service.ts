import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApisGeneralesService {

    constructor(private http: HttpClient) { }

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
}
