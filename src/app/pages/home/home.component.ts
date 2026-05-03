import { Component } from '@angular/core';
import { GameConfig, GAMES } from '../../config/games.config';
import { GameCardComponent } from '../../shared/components/game-card/game-card.component';

@Component({
  selector: 'app-home',
  imports: [GameCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  games: GameConfig[] = GAMES.filter(g => g.isActive);
}