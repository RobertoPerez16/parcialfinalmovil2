import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Taller } from '../../interfaces/taller';
import { AlertController, ToastController } from '@ionic/angular';
import { Paciente } from '../../interfaces/paciente';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { TallerService } from 'src/app/services/taller/taller.service';

@Component({
  selector: 'app-detalle-taller',
  templateUrl: './detalle-taller.page.html',
  styleUrls: ['./detalle-taller.page.scss'],
})
export class DetalleTallerPage implements OnInit {
  id: string;
  taller: Taller | any;
  paciente: Paciente | any;
  nombreInvitado = '';
  arrayInputs = [];
  invitados = [];
  pagoEvento = false;
  cantidadPagados = 0;

  constructor(private tallerService: TallerService, private activateRoute: ActivatedRoute,
              public alertCtrl: AlertController, private pacienteService: PacienteService,
              public toastController: ToastController) { }


  async ngOnInit() {
    this.id = this.activateRoute.snapshot.paramMap.get('id');
    const taller = await this.tallerService.obtenerTaller(this.id);
    this.taller = { ...taller.data(), id: taller.id };
    const invitados = await this.tallerService.obtenerInvitadosPorTaller(this.taller.id);
    invitados.forEach(doc => {
        this.invitados.push({
          id: doc.id,
          ...doc.data()
        });
    });

    this.invitados.forEach(elem => {
        if (elem.pagoEvento) {
           this.cantidadPagados+=1;
        }
    });
  }

  agregarInvitado() {
    if (this.nombreInvitado === '') {
        alert('No deje campos vacíos');
        return;
    }
    console.log(this.id);
    this.tallerService.agregarInvitado(this.nombreInvitado, this.pagoEvento, this.id, this.taller.precio).then(data =>{
      console.log(data);
    });

  }


  async abrirAlertComentario() {
    const alertaComentario = await this.alertCtrl.create({
      header: 'Agrege un comentario de este Taller',
      inputs: [
        {
          placeholder: 'Escriba su comentario',
          type: 'textarea',
          value: ''
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Guardar',
          handler: conf => {
            if(conf[0] !== ''){
              this.tallerService.agregarComentarioTaller(conf['0'], this.id).then(
                () =>{
                  this.presentToast('Comentarios Guardados Exitosamente');
                },
                error => {
                  console.log(error);
                }
              );
            }else{
              this.presentToast('La caja de texto no puede estar vacia');
            }
            console.log(conf);
          }
        }
      ]
    });

    await alertaComentario.present();
  }

  async presentToast(mensaje) {
    const toast = await this.toastController.create({
      message: `${mensaje}`,
      duration: 2000
    });
    toast.present();
  }

}
