import {Component, inject} from '@angular/core';
import {BoardService, CellState, GAME_STATE} from '../../services/board-service';

@Component({
  selector: 'app-game-status',
  imports: [],
  templateUrl: './game-status.html',
  styleUrl: './game-status.scss',
})
export class GameStatus {
  protected boardService = inject(BoardService);

  protected readonly GAME_STATE = GAME_STATE;

  protected readonly gameReadyText = 'Game not started';
  protected gameDrawText: string = 'Game is a draw';

  protected gameWonText(currentPlayer: CellState) {
    return `Player ${this.getPlayerView(currentPlayer)} won!`;
  }

  protected currentPlayerText(currentPlayer: CellState) {
    return `current player: ${this.getPlayerView(currentPlayer)} 's turn`;
  }

  private getPlayerView(player: CellState) {
    return `<p [style.color]="player === 'X' ? 'coral' : 'lightblue'">${player === 'X' ? 'X' : 'O'}</p>`;
  }
}
