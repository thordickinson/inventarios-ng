import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BienListComponent } from './bien/bien-list/bien-list.component';
import { BienEditorComponent } from './bien/bien-editor/bien-editor.component';
const routes: Routes = [

  { path: '', redirectTo: '/listar-bienes', pathMatch: 'full' },
  {
    path: 'listar-bienes',
    component: BienListComponent
  },
  {
    path: 'nuevo-bien',
    component: BienEditorComponent
  },
  {
    path: 'editar-bien/:id',
    component: BienEditorComponent
  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }