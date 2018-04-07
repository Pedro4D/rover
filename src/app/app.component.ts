import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public field = false;
  public title = 'Welcome to the Moon';
  public col:number;
  public row:number;

/**
 * Method to init the field
 *  @param(ev) Event mouse
 */
initField(ev) {
  ev.stopPropagation(); 
  this.field = !this.field;
}

}

