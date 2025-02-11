import { Routes } from '@angular/router';
import { IndexComponent } from './views/index/index.component';
import { ContactoComponent } from './views/contacto/contacto.component';
import { ClientesComponent } from './views/clientes/clientes.component';
import { NoticiasComponent } from './views/noticias/noticias.component';
import { ProductosComponent } from './views/productos/productos.component';

export const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: IndexComponent },
    { path: 'contacto', component: ContactoComponent },
    { path: 'clientes', component: ClientesComponent },
    { path: 'noticias', component: NoticiasComponent },
    { path: 'productos', component: ProductosComponent },

];
