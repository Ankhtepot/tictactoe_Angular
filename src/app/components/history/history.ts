import {Component, inject} from '@angular/core';
import {BoardService} from '../../services/board-service';

@Component({
  selector: 'app-history',
  imports: [],
  templateUrl: './history.html',
  styleUrl: './history.scss',
})
export class History {
    boardService = inject(BoardService);
}
