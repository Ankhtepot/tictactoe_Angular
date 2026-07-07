import {Component, inject} from '@angular/core';
import {BoardService} from '../../services/board-service';
import {Cell} from '../cell/cell';

@Component({
  selector: 'app-board',
  imports: [
    Cell
  ],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board {
  public boardService = inject(BoardService);
}
