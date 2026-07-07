import {Injectable, Signal, signal} from '@angular/core';

export const GAME_STATE = {
  STOPPED: 'Stop',
  STARTED: 'Start',
  DRAW: 'Draw',
  WON: 'Win'
} as const;

export type CellState = 'X' | 'O' | null;
export type GameState = typeof GAME_STATE[keyof typeof GAME_STATE];
export type WinData = { won: boolean, winningLine: number[] | null };

const MIN_BOARD_SIZE: number = 3;
const MAX_BOARD_SIZE: number = 5;


const isWinner = (board: CellState[], player: CellState): WinData => {
  let size = Math.sqrt(board.length);

  let isWinner = false;

  let winningLine: number[] = [];

  // horizontal
  for (let lineNr = 0; lineNr < size; lineNr++) {
    winningLine = [];
    for (let columnNr = 0; columnNr < size; columnNr++) {
      if (board[lineNr * size + columnNr] !== player)
        break;

      winningLine.push(lineNr * size + columnNr);

      if (columnNr === size - 1) {
        return {won: true, winningLine};
      }
    }
  }

  // vertical
  for (let columnNr = 0; columnNr < size; columnNr++) {
    for (let lineNr = 0; lineNr < size; lineNr++) {
      if (board[lineNr * size + columnNr] !== player)
        break;

      winningLine.push(lineNr * size + columnNr);

      if (lineNr === size - 1) {
        isWinner = true;
      }
    }

    if (isWinner)
      return {won: true, winningLine};
  }

  winningLine = [];

  // diagonal \
  for (let lineNr = 0; lineNr < size; lineNr++) {
    if (board[lineNr * size + lineNr] !== player)
      break;

    winningLine.push(lineNr * size + lineNr);

    if (lineNr === size - 1) {
      return {won: true, winningLine};
    }
  }

  winningLine = [];

  // diagonal /
  for (let lineNr = 0; lineNr < size; lineNr++) {
    let testedIndex = lineNr * size + size - 1 - lineNr;
    console.log(testedIndex);
    if (board[testedIndex] !== player)
      break;

    winningLine.push(testedIndex);

    if (lineNr === size - 1) {
      return {won: true, winningLine};
    }
  }

  return {won: false, winningLine: null};
};

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private _boardSize = signal(3);
  private _board = signal<CellState[]>(this.initializeBoard());
  private _currentPlayer = signal<CellState>('X');
  private _gameState = signal<GameState>('Stop');
  private _winningLine = signal<number[] | null>(null);

  boardSize = this._boardSize.asReadonly();
  board: Signal<CellState[]> = this._board;
  currentPlayer = this._currentPlayer.asReadonly();
  gameState = this._gameState.asReadonly();
  winningLine = this._winningLine.asReadonly();

  constructor() {
  }

  decreaseBoardSize() {
    this._boardSize.update(size => Math.max(MIN_BOARD_SIZE, size - 1));
    this.resetBoard();
  }

  increaseBoardSize() {
    this._boardSize.update(size => Math.min(MAX_BOARD_SIZE, size + 1));
    this.resetBoard();
  }

  initializeBoard(): CellState[] {
    return Array(this._boardSize() * this._boardSize()).fill(null);
  }

  resetBoard() {
    this._board.set(this.initializeBoard());
    this._currentPlayer.set('X');
    this._gameState.set(GAME_STATE.STOPPED);
    this._winningLine.set(null);
  }

  handlePlayerClickOnIndex(callIndex: number) {
    if (this._board()[callIndex] === null) {
      this._board.update(board => {
        const newBoard = [...board];
        newBoard[callIndex] = this._currentPlayer();
        return newBoard;
      });
      this._gameState.set(GAME_STATE.STARTED);

      const winData = isWinner(this._board(), this._currentPlayer());
      if (winData.won) {
        this._gameState.set(GAME_STATE.WON);
        this._winningLine.set(winData.winningLine);
      } else if (this._board().filter(cell => cell === null).length === 0) {
        this._gameState.set(GAME_STATE.DRAW);
      } else {
        this._currentPlayer.set(this._currentPlayer() === 'X' ? 'O' : 'X');
      }
    }
  }
}
