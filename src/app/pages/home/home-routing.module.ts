import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/components/home/home.component';
import { ListaPacientesComponent } from 'src/app/components/lista-pacientes/lista-pacientes.component';
import { ListaTalleresComponent } from 'src/app/components/lista-talleres/lista-talleres.component';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'lista-talleres',
        component: ListaTalleresComponent
      },
      {
        path: 'lista-pacientes',
        component: ListaPacientesComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
