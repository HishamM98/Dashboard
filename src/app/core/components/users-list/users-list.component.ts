import { Component, inject, signal } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/types/user';
import { ApiResponse } from '../../../shared/types/apiresponse';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [MatPaginatorModule, MatGridListModule, MatCardModule, MatButtonModule, RouterModule, LoaderComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  private user$ = inject(UserService);
  users = signal<User[]>([]);
  response: ApiResponse | undefined;
  private subscription!: Subscription;


  ngOnInit() {
    this.getUsers(0);
  }

  getUsers(page: number): void {
    this.users.set([]);
    setTimeout(() => {
      this.subscription = this.user$.getUsersByPage(page + 1).subscribe({
        next: (res) => {
          this.users.set(res.data);
          this.response = res;
        },
        error: (err) => alert(err.message)
      });
    }, 1000);

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
