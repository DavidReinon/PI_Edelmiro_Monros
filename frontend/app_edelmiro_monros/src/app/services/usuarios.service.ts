import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.interfaz';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(public http: HttpClient) {}

  public getUsuario(url: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(url);
  }
  public postUsuario(url: string, usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(url, usuario);
  }

  public putUsuario(
    url: string,
    id: number,
    usuario: Usuario
  ): Observable<Usuario> {
    return this.http.put<Usuario>(`${url}/${id}`, usuario);
  }

  public patchUsuario(
    url: string,
    id: number,
    usuario: Partial<Usuario>
  ): Observable<Usuario> {
    return this.http.patch<Usuario>(`${url}/${id}`, usuario);
  }
}
