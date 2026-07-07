import {Component, inject, input} from '@angular/core';
import {BoardService, CellState, GAME_STATE} from '../../services/board-service';
import {Circle, LucideAngularModule, X} from 'lucide-angular';

@Component({
  selector: 'app-cell',
  imports: [LucideAngularModule],
  templateUrl: './cell.html',
  styleUrl: './cell.scss',
})
export class Cell {
  state = input<CellState>(null);
  index = input<number>(0);

  protected boardService = inject(BoardService);

  protected readonly Circle = Circle;
  protected readonly XIcon = X;

  protected onClick() {
    if (this.boardService.gameState() !== GAME_STATE.WON)

    this.boardService.handlePlayerClickOnIndex(this.index());
  }

  protected readonly GAME_STATE = GAME_STATE;
}
