import { Injectable } from '@angular/core';
import { AuthService } from '../authservice/auth.service';
import {
  AngularFirestore
} from '@angular/fire/compat/firestore';
import { Taller } from 'src/app/interfaces/taller';
import 'firebase/auth';
import firebase from 'firebase/compat/app';
import { DocumentReference } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class TallerService {

  public listRefEvent: firebase.firestore.CollectionReference;
  constructor(private authService: AuthService, private firestore: AngularFirestore) { }

  crearTaller(taller: Taller): Promise<DocumentReference> {
    const user: firebase.User = this.authService.getUser();
    this.listRefEvent = firebase.firestore().collection( `usuario/${user.uid}/listaTalleres`);
    return this.listRefEvent.add({
      nombre: taller.nombre,
      fecha: taller.fecha,
      precio: taller.precio,
      costo: taller.costo,
      ingresos: taller.costo * -1,
    });
  }

  obtenerTalleres(): Promise<firebase.firestore.QuerySnapshot> {
    const user: firebase.User = this.authService.getUser();
    this.listRefEvent= firebase.firestore().collection(`usuario/${user.uid}/listaTalleres`);
    return this.listRefEvent.get();
  }

  obtenerTaller(id: string): Promise<firebase.firestore.QueryDocumentSnapshot> {
    const user: firebase.User = this.authService.getUser();
    this.listRefEvent= firebase.firestore().collection(`usuario/${user.uid}/listaTalleres`);
    return this.listRefEvent.doc(id).get();
  }


  async agregarInvitado(nombreInvitado: string, pagoEvento: boolean, idTaller: string, precioTaller: number ) {
     const user: firebase.User = this.authService.getUser();
     const tallerRef = firebase.firestore().collection(`usuario/${user.uid}/listaTalleres/${idTaller}/listaInvitados`);
     const anotherRef = firebase.firestore().collection(`usuario/${user.uid}/listaTalleres`);
     await tallerRef.add({ nombreInvitado, pagoEvento });
     try {
       const db = firebase.firestore();
       await db.runTransaction(async (t) => {
         const doc = await t.get(anotherRef.doc(idTaller));
         const nuevoIngreso = doc.data().ingresos + precioTaller;
         t.update(anotherRef.doc(idTaller), {ingresos: nuevoIngreso});
       });
       console.log('Transaction success!');
       window.location.reload();
     } catch (e) {
       console.log('Transaction failure:', e);
     }
  }

  obtenerInvitadosPorTaller(idEvento: string): Promise<firebase.firestore.QuerySnapshot> {
    const user: firebase.User = this.authService.getUser();
    this.listRefEvent= firebase.firestore().collection(`usuario/${user.uid}/listaTalleres/${idEvento}/listaInvitados`);
    return this.listRefEvent.get();
  }

  agregarComentarioTaller(comentarios: string, id: string) {
    return this.firestore.collection('talleres').doc(id).update({
      comentarios
    });
  }
}
