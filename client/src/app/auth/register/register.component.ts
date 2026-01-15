import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthActions } from '../../store/auth/auth.actions';
import { selectAuthState } from '../../store/auth/auth.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private store = inject(Store);

  name = '';
  email = '';
  password = '';

  isLoading$: Observable<boolean> = this.store.select(selectAuthState).pipe(map(s => s.isLoading));
  error$: Observable<string | null> = this.store.select(selectAuthState).pipe(map(s => s.error));

  onSubmit(): void {
    this.store.dispatch(AuthActions.register({
      name: this.name,
      email: this.email,
      password: this.password
    }));
  }
}