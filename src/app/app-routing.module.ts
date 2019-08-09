import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './comps/student/student.component';


const routes: Routes = [

  {
    path: '',
    component: StudentComponent,
    data: {title: 'StudentRegistration'}
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
