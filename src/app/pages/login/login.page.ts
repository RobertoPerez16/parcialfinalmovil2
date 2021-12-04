import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authservice/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { User } from '../../interfaces/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin = new FormGroup({
      email: new FormControl('',
         [Validators.required, Validators.email
      ]),
      password: new FormControl('',
          [Validators.required, Validators.minLength(6)
      ])
  });

  user: User = {
      email: '',
      password: ''
  };

  constructor(private authService: AuthService, private router: Router,
              private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async makeLogin() {
    if (this.formLogin.valid) {
       this.user.email = this.formLogin.value.email;
       this.user.password = this.formLogin.value.password;
       const response = await this.authService.loginUser(this.user);
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
        this.formLogin.reset();
        this.router.navigateByUrl('/home');
    }
  }

  get emailField() {
      return this.formLogin.get('email');
  }

  get passField() {
      return this.formLogin.get('password');
  }

}
