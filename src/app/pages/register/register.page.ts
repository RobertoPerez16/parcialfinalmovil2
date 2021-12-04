import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authservice/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: User = {
    email: '',
    password: ''
  };

  formRegister = new FormGroup({
    email: new FormControl('',
        [Validators.required, Validators.email
    ]),
    password: new FormControl('',
        [Validators.required, Validators.minLength(6)
    ])
  });

  constructor(private authService: AuthService, private router: Router,
              private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async registerUser() {
      if (this.formRegister.valid) {
          this.user.email = this.formRegister.value.email;
          this.user.password = this.formRegister.value.password;
          const response = await this.authService.registerUser(this.user);
          if (response instanceof Error) {
              const alert = await this.alertCtrl.create({
                  message: response.message,
                  buttons: [{
                      text: 'Ok',
                      role: 'cancel'
                  }]
              });
              await alert.present();
              return;
          }

          this.router.navigateByUrl('/login');
      }
  }

  get emailField() {
      return this.formRegister.get('email');
  }

  get passField() {
      return this.formRegister.get('password');
  }

}
