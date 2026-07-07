import {Component, inject} from '@angular/core';
import {SizeChange} from '../size-change/size-change';
import {Board} from '../board/board';
import {GameStatus} from '../game-status/game-status';
import {BoardService} from '../../services/board-service';

@Component({
  selector: 'app-game',
  imports: [
    SizeChange,
    Board,
    GameStatus
  ],
  templateUrl: './game.html',
  styleUrl: './game.scss',
})
export class Game {
  protected boardService = inject(BoardService);

  protected resetGame() {
    this.boardService.resetBoard();
  }
}
