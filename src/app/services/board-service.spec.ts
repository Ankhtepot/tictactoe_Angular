import { TestBed } from '@angular/core/testing';
import { BoardService, GAME_STATE } from './board-service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('BoardService', () => {
  let service: BoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
    service = TestBed.inject(BoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle win and history switching correctly', () => {
    // Game flow for 3x3:
    // X at 0
    // O at 3
    // X at 1
    // O at 4
    // X at 2 (X wins)
    
    service.handlePlayerClickOnIndex(0); // X
    service.handlePlayerClickOnIndex(3); // O
    service.handlePlayerClickOnIndex(1); // X
    service.handlePlayerClickOnIndex(4); // O
    service.handlePlayerClickOnIndex(2); // X - Wins!

    expect(service.gameState()).toBe(GAME_STATE.WON);
    expect(service.currentPlayer()).toBe('X');
    expect(service.winningLine()).toEqual([0, 1, 2]);

    // Switch to Move 4 (O played at 4, no win yet)
    // Move 4 is index 3 in history (1-based: Move 1, 2, 3, 4)
    service.switchToHistory(3);
    expect(service.gameState()).toBe(GAME_STATE.STARTED);
    expect(service.currentPlayer()).toBe('X'); // X is next after O plays
    expect(service.winningLine()).toBeNull();

    // Switch back to Move 5 (X played at 2, X wins)
    // Move 5 is index 4 in history
    service.switchToHistory(4);
    expect(service.gameState()).toBe(GAME_STATE.WON);
    expect(service.currentPlayer()).toBe('X'); // X won
    expect(service.winningLine()).toEqual([0, 1, 2]);
  });

  it('should handle draw and history switching correctly', () => {
    // 3x3 Draw flow:
    // X at 0, O at 1, X at 2
    // X at 4, O at 3, X at 5
    // O at 6, X at 7, O at 8
    // Wait, let's make it simpler:
    // X: 0, 2, 3, 7, 5
    // O: 1, 4, 6, 8
    
    service.handlePlayerClickOnIndex(0); // X
    service.handlePlayerClickOnIndex(1); // O
    service.handlePlayerClickOnIndex(2); // X
    service.handlePlayerClickOnIndex(4); // O
    service.handlePlayerClickOnIndex(3); // X
    service.handlePlayerClickOnIndex(6); // O
    service.handlePlayerClickOnIndex(7); // X
    service.handlePlayerClickOnIndex(8); // O
    service.handlePlayerClickOnIndex(5); // X - Draw (board full)

    expect(service.gameState()).toBe(GAME_STATE.DRAW);
    expect(service.winningLine()).toBeNull();

    // Switch to Move 8 (O played at 8, not draw yet)
    service.switchToHistory(7);
    expect(service.gameState()).toBe(GAME_STATE.STARTED);
    expect(service.currentPlayer()).toBe('X');
    expect(service.winningLine()).toBeNull();

    // Switch back to Move 9 (X played at 5, draw)
    service.switchToHistory(8);
    expect(service.gameState()).toBe(GAME_STATE.DRAW);
  });
});
