import {Component, computed, inject} from '@angular/core';
import {LucideAngularModule, ArrowBigDown, ArrowBigUp} from 'lucide-angular';
import {BoardService, GAME_STATE} from '../../services/board-service';

@Component({
  selector: 'app-size-change',
  imports: [LucideAngularModule],
  templateUrl: './size-change.html',
  styleUrl: './size-change.scss',
})
export class SizeChange {
  private boardService = inject(BoardService);

  public boardSize = computed(() => this.boardService.boardSize());
  public gameState = computed(() => this.boardService.gameState());

  public ArrowBigDown = ArrowBigDown;
  public ArrowBigUp = ArrowBigUp;

  protected onSizeLower() {
    this.boardService.decreaseBoardSize();
  }

  protected onSizeRaise() {
    this.boardService.increaseBoardSize();
  }


  protected readonly GAME_STATE = GAME_STATE;
}
