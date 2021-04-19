import { TestFormatComponent } from './test-format/test-format.component';
import { LinkComponent } from './link/link.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignComponent } from './sign/sign.component';

const routes: Routes = [
  {path:"students/signUp",component:SignComponent},
  {path:"exam/fetchLink",component:LinkComponent},
  {path:"test/:id",component:TestFormatComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
