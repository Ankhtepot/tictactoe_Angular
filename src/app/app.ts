import { Component } from '@angular/core';
import {Game} from './components/game/game';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    Game,
    NgClass
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'tic-tac-toe';
}
