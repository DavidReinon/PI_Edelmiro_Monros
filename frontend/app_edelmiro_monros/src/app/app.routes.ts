import { Routes } from '@angular/router';
import { ContactoComponent } from './views/contacto/contacto.component';
import { ClientesComponent } from './views/clientes/clientes.component';
import { NoticiasComponent } from './views/noticias/noticias.component';
import { ProductosComponent } from './views/productos/productos.component';
import { InicioComponent } from './views/inicio/inicio.component';
import { CrearNoticiaComponent } from './views/noticias/crear-noticia/crear-noticia.component';
import { EditarNoticiaComponent } from './views/noticias/editar-noticia/editar-noticia.component';
import { AvisoLegalComponent } from './views/aviso-legal/aviso-legal.component';
import { AccesibilidadComponent } from './views/accesibilidad/accesibilidad.component';
import { PoliticaCookiesComponent } from './views/politica-cookies/politica-cookies.component';
import { PoliticaPrivacidadComponent } from './views/politica-privacidad/politica-privacidad.component';
import { FormularioProductoComponent } from './views/formulario-producto/formulario-producto.component';
import { EditarProductoComponent } from './views/productos/editar-producto/editar-producto.component';

export const routes: Routes = [
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    { path: 'inicio', component: InicioComponent },
    { path: 'contacto', component: ContactoComponent },
    { path: 'clientes', component: ClientesComponent },
    { path: 'noticias', component: NoticiasComponent },
    { path: 'noticias/crear', component: CrearNoticiaComponent },
    { path: 'noticias/editar', component: EditarNoticiaComponent },
    { path: 'productos', component: ProductosComponent },
    {path: 'aviso', component: AvisoLegalComponent},
    {path: 'accesibilidad', component: AccesibilidadComponent},
    {path: 'cookies', component: PoliticaCookiesComponent},
    {path: 'privacidad', component: PoliticaPrivacidadComponent},
    {path: 'formularioProducto/:id', component: FormularioProductoComponent},
    {path: 'formularioProducto', component: FormularioProductoComponent},
    {path: 'editar-producto/:id', component: EditarProductoComponent},



];
