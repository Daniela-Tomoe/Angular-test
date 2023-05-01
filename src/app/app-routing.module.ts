import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/pages/list/list.component';
import { DetailsComponent } from './components/pages/details/details.component';

const routes: Routes = [
  {path: '', component: ListComponent},
  {path:'details/:id', component: DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
