import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public authenticator: AngularFireAuth) {
  }

  async loginUser(user: User) {
    try {
        const response = await this.authenticator.signInWithEmailAndPassword(user.email, user.password);
        if (response && response.user) {
            localStorage.setItem('user', JSON.stringify(response.user));
            return response;
        } else {
            localStorage.setItem('user', null);
            return new Error('Usuario o contraseña Erróneas');
        }
    } catch (err) {
        console.log(err);
        localStorage.setItem('user', null);
        return new Error('El usuario no existe o no se encuentra registrado');
    }
  }

  async registerUser(user: User) {
    try {
      const response = await this.authenticator.createUserWithEmailAndPassword(user.email, user.password);
      if (response && response.user) {
          return response;
      } else {
         return new Error('Ocurrió un error en el registro, favor intente más tarde');
      }
    } catch (err) {
        return new Error(err);
    }
  }

  async resetPassword(email: string) {
    try {
        await this.authenticator.sendPasswordResetEmail(email);
    } catch (err) {
        return new Error('El correo ingresado no existe');
    }
  }

  isLoggedIn() {
     const user = JSON.parse(localStorage.getItem('user'));
     return (user !== null);
  }

  logoutUser() {
    localStorage.setItem('user', null);
    return this.authenticator.signOut();
  }

  getUser() {
     const user = JSON.parse(localStorage.getItem('user'));
     return user;
  }


}
