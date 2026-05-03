import { Component } from '@angular/core';
import { GameConfig, GAMES } from '../../config/games.config';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageWrapperComponent } from '../../shared/components/page-wrapper/page-wrapper.component';
import { TornadoTableComponent } from '../../shared/components/tornado-table/tornado-table.component';

@Component({
  selector: 'app-game-entry',
  imports: [CommonModule, PageWrapperComponent, TornadoTableComponent],
  templateUrl: './game-entry.component.html',
  styleUrls: ['./game-entry.component.scss'],
})
export class GameEntryComponent {
  gameConfig: GameConfig = GAMES[0]; // Default to first game for demo purposes
  currentIndex = 0;
  roomTableColumns = [
    { key: 'roomId', label: 'Room code' },
    { key: 'players', label: 'Players' },
  ];
  data = [
    // { roomId: 'ABCD', players: '2/4' },
    // { roomId: 'EFGH', players: '1/4' },
    // { roomId: 'IJKL', players: '3/4' },
  ];
  actions = [{ action: 'join', label: 'Join', icon: 'login' }];

  next() {
    const total = this.gameConfig?.banners?.length || 0;
    this.currentIndex = (this.currentIndex + 1) % total;
  }

  prev() {
    const total = this.gameConfig?.banners?.length || 0;
    this.currentIndex = (this.currentIndex - 1 + total) % total;
  }

  goTo(index: number) {
    this.currentIndex = index;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    const gameId = this.route.snapshot.paramMap.get('id');
    if (gameId) {
      const foundGame = GAMES.find((game) => game.id === gameId);
      if (foundGame) {
        this.gameConfig = foundGame;
      }
    }

    if (!this.gameConfig) {
      // If no valid game config is found, navigate back to home
      this.router.navigate(['/home']);
    }
  }

  handleRowAction(event: { action: string; row: any }) {
    if (event.action === 'join') {
      // Handle join action
      console.log('Joining room:', event.row);
    }
  }
}
