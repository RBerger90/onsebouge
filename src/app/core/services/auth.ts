import { Service, signal } from '@angular/core';

@Service()
export class Auth {
  private readonly _isLoggedIn = signal(false);
  readonly isLoggedIn = this._isLoggedIn.asReadonly();

  /**
   * TODO: remplacer par un vrai appel HTTP vers l'API Express une fois le backend en place.
   * Pour l'instant, simule toujours une connexion réussie.
   */
  login(email: string, password: string): void {
    this._isLoggedIn.set(true);
  }

  /**
   * TODO: remplacer par un vrai appel HTTP vers l'API Express une fois le backend en place.
   * Pour l'instant, simule toujours une connexion réussie.
   */
  register(email: string, password: string): void {
    // register the new user
    this.login(email, password);
  }
}
