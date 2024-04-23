import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { UsersListComponent } from '../components/users-list/users-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, UsersListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
