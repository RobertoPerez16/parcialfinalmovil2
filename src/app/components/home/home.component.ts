import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    autoplay:true,
  };

  hora; 
  constructor() { }

  ngOnInit() {
    this.hora = new Date();
  }

}
