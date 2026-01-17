import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'', loadComponent: () => import("./login/login.component").then(m => m.LoginComponent)},
    {path:'login', loadComponent: () => import("./login/login.component").then(m => m.LoginComponent)},
    {path:'register', loadComponent: () => import("./register/register.component").then(m => m.RegisterComponent)},
    {path:'board', loadComponent: () => import("./board/board.component").then(m => m.BoardComponent)},
    {path:'users', loadComponent: () => import("./users/users.component").then(m => m.UsersComponent)}
];
