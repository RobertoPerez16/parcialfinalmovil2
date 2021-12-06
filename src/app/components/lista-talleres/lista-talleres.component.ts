import { Component, OnInit } from '@angular/core';
import { Taller } from 'src/app/interfaces/taller';
import { TallerService } from 'src/app/services/taller/taller.service';

@Component({
  selector: 'app-lista-talleres',
  templateUrl: './lista-talleres.component.html',
  styleUrls: ['./lista-talleres.component.scss'],
})
export class ListaTalleresComponent implements OnInit {

  taller: Taller | any = [];

  constructor(private tallerService: TallerService) {}

  async ngOnInit() {
    const talleres = await this.tallerService.obtenerTalleres();
    talleres.forEach(doc => {
      this.taller.push({
        id: doc.id,
        nombre: doc.data().nombre,
        hora: doc.data().fecha,
        ingresos: doc.data().ingresos,
        precio: doc.data().precio,
        costo: doc.data().costo
      });
    });
  }

}
