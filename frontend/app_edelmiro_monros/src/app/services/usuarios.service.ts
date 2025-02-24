import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuarios } from '../models/usuario.interfaz';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(public http: HttpClient) {}

  private apiUrl = 'http://44.214.111.49/api/usuarios';

  public getUsuarios(): Observable<Usuarios> {
    return this.http.get<Usuarios>(this.apiUrl);
  }
  public postUsuarios(Usuarios: Usuarios): Observable<Usuarios> {
    return this.http.post<Usuarios>(this.apiUrl, Usuarios);
  }

  public putUsuarios(id: number, Usuarios: Usuarios): Observable<Usuarios> {
    return this.http.put<Usuarios>(`${this.apiUrl}/${id}`, Usuarios);
  }

  public patchUsuarios(
    id: number,
    Usuarios: Partial<Usuarios>
  ): Observable<Usuarios> {
    return this.http.patch<Usuarios>(`${this.apiUrl}/${id}`, Usuarios);
  }
}
