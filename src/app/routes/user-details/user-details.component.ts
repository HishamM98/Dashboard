import { Subscription, switchMap } from 'rxjs';
import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/types/user';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, HeaderComponent, MatTooltipModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private subscription!: Subscription;
  user!: User;
  ngOnInit() {
    this.subscription = this.route.paramMap.pipe(
      switchMap(params => {
        let id = params.get('id')!;
        return this.userService.getUser(id);
      })
    ).subscribe({
      next: (res) => {
        this.user = res;
      },
      error: (err) => { alert(err.message); }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
