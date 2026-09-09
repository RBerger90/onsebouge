import { Service, signal } from '@angular/core';

@Service()
export class Auth {
  private readonly _isLoggedIn = signal(false);
  readonly isLoggedIn = this._isLoggedIn.asReadonly();
}
