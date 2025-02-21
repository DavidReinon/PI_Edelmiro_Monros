import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuarios } from '../models/usuario.interfaz';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(public http: HttpClient) {}

  public getUsuarios(url: string): Observable<Usuarios> {
    return this.http.get<Usuarios>(url);
  }
  public postUsuarios(url: string, Usuarios: Usuarios): Observable<Usuarios> {
    return this.http.post<Usuarios>(url, Usuarios);
  }

  public putUsuarios(
    url: string,
    id: number,
    Usuarios: Usuarios
  ): Observable<Usuarios> {
    return this.http.put<Usuarios>(`${url}/${id}`, Usuarios);
  }

  public patchUsuarios(
    url: string,
    id: number,
    Usuarios: Partial<Usuarios>
  ): Observable<Usuarios> {
    return this.http.patch<Usuarios>(`${url}/${id}`, Usuarios);
  }
}
