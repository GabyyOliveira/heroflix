import { HomeComponent } from './componentes/home/home.component';

import { LivroFormComponent } from './componentes/livro-form/livro-form.component';
import { ListaComponent } from './componentes/lista/lista.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarComponent} from './componentes/editar/editar.component'

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component:HomeComponent},
  {path: 'lista', component:ListaComponent},
  {path: 'add', component:LivroFormComponent},
  {path: 'edit/:id', component: LivroFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
