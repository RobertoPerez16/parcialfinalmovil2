import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Taller } from 'src/app/interfaces/taller';
import { TallerService } from 'src/app/services/taller/taller.service';

@Component({
  selector: 'app-crear-taller',
  templateUrl: './crear-taller.page.html',
  styleUrls: ['./crear-taller.page.scss'],
})
export class CrearTallerPage implements OnInit {

  formTaller = new FormGroup({
    nombre: new FormControl('', Validators.required),
    fecha: new FormControl('', Validators.required),
    costo: new FormControl(0, Validators.required),
    precio: new FormControl(0, Validators.required)
  });

  taller: Taller = {
    id: '',
    nombre: '',
    fecha: '',
    experto: '',
    cantInscritos: 0,
    comentarios: '',
    precio: 0,
    costo: 0
  };

  constructor(private tallerService: TallerService, public alertCtrl: AlertController,
              public loadingCtrl: LoadingController, private router: Router) { }

  ngOnInit() {
  }

  async submit() {
    this.taller = {
      id: '',
      nombre: this.formTaller.value.nombre,
      fecha: this.formTaller.value.fecha,
      experto: this.formTaller.value.experto,
      cantInscritos: 0,
      comentarios: '',
      precio: this.formTaller.value.precio,
      costo: this.formTaller.value.costo
    };

    const loading = await this.loadingCtrl.create();
    this.tallerService.crearTaller(this.taller).then(
        () => {
          loading.dismiss().then(() =>{
            this.router.navigateByUrl('/home/lista-talleres');
          });
        },
        async error => {
          const alert = await this.alertCtrl.create({
            message: error.message,
            buttons: [{
              text: 'Ok',
              role: 'cancel'
            }]
          });
          await alert.present();
          return;
        }
    );
    return await loading.present();
  }

}
