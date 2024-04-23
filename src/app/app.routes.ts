import { DashboardComponent } from './core/dashboard/dashboard.component';
import { Routes } from '@angular/router';
import { UserDetailsComponent } from './routes/user-details/user-details.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'user/:id', component: UserDetailsComponent },
    { path: '**', redirectTo: '' }
];
