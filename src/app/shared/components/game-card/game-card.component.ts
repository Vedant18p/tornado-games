import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GameConfig } from '../../../config/games.config';

@Component({
  selector: 'app-game-card',
  imports: [],
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent {

  @Input() game!: GameConfig;

  constructor(private router: Router) {}

  openGame() {
    this.router.navigate([this.game.route]);
  }
}