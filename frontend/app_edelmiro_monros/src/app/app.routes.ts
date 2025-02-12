import { Routes } from '@angular/router';
import { ContactoComponent } from './views/contacto/contacto.component';
import { ClientesComponent } from './views/clientes/clientes.component';
import { NoticiasComponent } from './views/noticias/noticias.component';
import { ProductosComponent } from './views/productos/productos.component';
import { InicioComponent } from './views/inicio/inicio.component';

export const routes: Routes = [
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    { path: 'inicio', component: InicioComponent },
    { path: 'contacto', component: ContactoComponent },
    { path: 'clientes', component: ClientesComponent },
    { path: 'noticias', component: NoticiasComponent },
    { path: 'productos', component: ProductosComponent },

];
