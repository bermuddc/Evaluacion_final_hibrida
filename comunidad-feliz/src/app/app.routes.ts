import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'lista-avisos', 
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage)
  },
  {
    path: 'lista-avisos',
    loadComponent: () => import('./pages/lista-avisos/lista-avisos.page').then((m) => m.ListaAvisosPage)
  },
  {
    path: 'formulario-aviso',
    loadComponent: () => import('./pages/formulario-aviso/formulario-aviso.page').then((m) => m.FormularioAvisoPage)
  },
  {
    path: '**',  
    redirectTo: 'lista-avisos'  
  }
];