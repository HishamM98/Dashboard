import { User } from './../../types/user';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { UserService } from '../../services/user.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatToolbarModule, MatFormFieldModule, FormsModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  user = inject(UserService);
  myControl = new FormControl('');
  options!: User[];
  filteredOptions!: Observable<User[]>;
  private subscription!: Subscription;


  ngOnInit() {
    this.subscription = this.user.getAllUsers().subscribe({
      next: (res) => {
        this.options = res;
      },
      error: (err) => { alert(err.message); }
    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: number | string): User[] {
    return this.options.filter(option => option.id == value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
