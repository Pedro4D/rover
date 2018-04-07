import { Component, OnInit, Input, HostListener, ElementRef, ViewChild  } from '@angular/core';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  @Input() col: number;
  @Input() row: number;
  public items = [];
  public initCol:number;
  public lastCol:number;
  public initRow:number;
  public lastRow:number;
  public orientation: string;
  public command: string;
  public canMove: boolean;
  @ViewChild("rov") rov: ElementRef;
  constructor() { }

  ngOnInit() {
    this.orientation = 'E';
    this.command = '';
    this.canMove = true;
    this.items = Array(this.col*this.row).fill('1');
    this.calcInit();
  }

  /**
   * Method to initialize the rover
   */
  calcInit(){
    this.initCol = 1;
    this.initRow = +(this.row);
    this.lastCol = 0;
    this.lastRow = 0;
  }

  /**
   * Listener
   */
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    this.move(event.key);
  }

  /**
   * Method to move the rover
   */
  move(key) {
    switch(key.toUpperCase()) {
      case 'A': this.moveAdvance();break;
      case 'L': this.orientationLeft();break;
      case 'R': this.orientationRight();break;
      default: return false;
    }
  }

  /**
   * Method to move the advance
   */
  moveAdvance() {
    switch(this.orientation) {
      case 'E' : this.moveRight(); break;
      case 'O' : this.moveLeft(); break;
      case 'N' : this.moveUp(); break;
      case 'S' : this.moveDown(); break;
    }
  }

  /**
   * Method to move the up
   */
  moveUp() {
    if (this.initRow !== 1) {
      this.initRow--;
      this.lastRow++;
    } else {
      this.canMove = false;
    }
  }

  /**
   * Method to move the down
   */
  moveDown() {
    if (this.initRow !== +(this.row)) {
      this.initRow++;
      this.lastRow--;
    } else {
      this.canMove = false;
    }
  }

  /**
   * Method to move the left
   */
  moveLeft() {
    if (this.initCol !== 1) {
      this.initCol--;
      this.lastCol--;
    } else {
      this.canMove = false;
    }
  }

  /**
   * Method to move the left
   */
  moveRight() {
    if (this.initCol !== +(this.col)) {
      this.initCol++;
      this.lastCol++;
    } else {
      this.canMove = false;
    }
  }

  /**
   * Change rover orientation to the left
   */
  orientationLeft() {
    let newOrientation;
    switch(this.orientation) {
      case 'E' : newOrientation = 'N'; break;
      case 'O' : newOrientation = 'S'; break;
      case 'N' : newOrientation = 'O'; break;
      case 'S' : newOrientation = 'E'; break;
    }
    this.rov.nativeElement.className = this.rov.nativeElement.className.replace(this.orientation,newOrientation);
    this.orientation = newOrientation;
  }

  /**
   * Change rover orientation to the right
   */
  orientationRight() {
    let newOrientation;
    switch(this.orientation) {
      case 'E' : newOrientation = 'S'; break;
      case 'O' : newOrientation = 'N'; break;
      case 'N' : newOrientation = 'E'; break;
      case 'S' : newOrientation = 'O'; break;
    }
    this.rov.nativeElement.className = this.rov.nativeElement.className.replace(this.orientation,newOrientation);
    this.orientation = newOrientation;
  }

  /**
   * Insert into command the valid moves
   * @params (event) keyress event
   */
  validateKey(event) {
    const key = event.data.toUpperCase();
    if ( key !== 'L' && key !== 'A' && key !== 'R') {
      return false;
    } else {
      this.command += key;
    }
  }

  /**
   * start the simulation
   */
  startSimulation() {
    this.canMove = true;
    this.calcInit();
    const keys = Array.from(this.command);
    keys.forEach(element => {
      this.move(element);
    });
  }
}
