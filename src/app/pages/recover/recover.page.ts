import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/authservice/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit {

  formRecover = new FormGroup({
      email: new FormControl('',
          [Validators.required, Validators.email
      ]),
  });

  user: User = {
      email: '',
      password: ''
  };

  constructor(private authService: AuthService, private alertCtrl: AlertController,
              private router: Router) { }

  ngOnInit() {
  }

  get emailField() {
    return this.formRecover.get('email');
  }

  async resetPassword() {
     if (this.formRecover.valid) {
         this.user.email = this.formRecover.value.email;
         const response = await this.authService.resetPassword(this.user.email);
         if (response instanceof Error) {
             const alertError = await this.alertCtrl.create({
                 message: response.message,
                 buttons: [{
                     text: 'Ok',
                     role: 'cancel'
                 }]
             });
             await alertError.present();
             return;
         }

         const alert = await this.alertCtrl.create({
             message: `Revisa tu correo, te hemos enviado un enlace para que
                restablezcas tu contraseña
             `,
             buttons: [{
                 text: 'Ok',
                 role: 'cancel',
                 handler: () => {
                     this.router.navigateByUrl('/login');
                 }
             }]
         });
         await alert.present();
         return;
     }
  }

}
