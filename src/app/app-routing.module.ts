import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './components/book/book-list/book-list.component';
import { CreateBookComponent } from './components/book/create-book/create-book.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { StandaloneComponent } from './components/standalone/standalone.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { AuthGuard } from './services/auth.guard';
import { RoleGuard } from './services/role.guard';

const routes: Routes = [
  { path: 'books', component: BookListComponent },
  { path: 'books/:id', component: BookListComponent },
  { path: 'create-book', component: CreateBookComponent, canActivate: [AuthGuard] },
  { path: 'update-book/:id', component: CreateBookComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]  },
  { path: 'users', component: UserListComponent, canActivate: [RoleGuard]  },
  { path: 'standalone', component: StandaloneComponent   },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
