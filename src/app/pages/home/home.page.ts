import { Component } from '@angular/core';
import { AuthService } from '../../services/authservice/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  //taller: Taller | any;
  titulo = '';
  constructor(private authService: AuthService, private router: Router) {}

  cambiarTitulo(titulo){
    this.titulo = titulo;
  }

  async logOut() {
    await this.authService.logoutUser();
    this.router.navigate(['login']);
  }
}
