# Tornado Games Project Progress

## Overview

This document summarizes the current progress of the `Tornado Games` Angular frontend project and includes the current complete source code of the key files that define the app state.

The project is built with Angular 19, using standalone components and client-side routing.

## Current Progress

### Implemented

- Angular application scaffold with `home` and `game` route structure
- Game catalog data in `src/app/config/games.config.ts`
- `GameCardComponent` navigation from home to specific game route
- `GameEntryComponent` entry flow with multiplayer options:
  - `quickPlay`
  - `createRoom`
  - `joinRoom`
  - `singlePlayer`
- Routing for `/game/:id` and basic child routes for `create`, `online`, `join`
- `SocketService` using `socket.io-client`
- `RoomService` with HTTP room creation and retrieval methods
- Environment configuration for local and production endpoints

### Pending / Incomplete

- Multiplayer room logic is still incomplete
- Lobby component is a placeholder only
- No actual game implementation beyond a skeleton Hangman entry
- `singlePlayer` route target exists but no route or component for `/play`
- `RoomService` and `SocketService` have basic stubs but no fully tested backend integration
- No actual socket connection management in the app bootstrap

## Route structure

The current routing is defined in `src/app/app.routes.ts`:

- `/home` → `HomeComponent`
- `/game/:id` → `GameShellComponent`
  - `''` → `GameEntryComponent`
  - `create` → `GameLobbyComponent`
  - `online` → `GameLobbyComponent`
  - `join` → `GameLobbyComponent`
- `**` → redirects to `/home`

## Key files and current code

### `package.json`

```json
{
  "name": "tornado-games",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
  },
  "private": true,
  "dependencies": {
    "@angular/common": "^19.2.0",
    "@angular/compiler": "^19.2.0",
    "@angular/core": "^19.2.0",
    "@angular/forms": "^19.2.0",
    "@angular/platform-browser": "^19.2.0",
    "@angular/platform-browser-dynamic": "^19.2.0",
    "@angular/router": "^19.2.0",
    "rxjs": "~7.8.0",
    "socket.io-client": "^4.8.3",
    "tslib": "^2.3.0",
    "zone.js": "~0.15.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^19.2.19",
    "@angular/cli": "^19.2.19",
    "@angular/compiler-cli": "^19.2.0",
    "@types/jasmine": "~5.1.0",
    "jasmine-core": "~5.6.0",
    "karma": "~6.4.0",
    "karma-chrome-launcher": "~3.2.0",
    "karma-coverage": "~2.2.0",
    "karma-jasmine": "~5.1.0",
    "karma-jasmine-html-reporter": "~2.1.0",
    "typescript": "~5.7.2"
  }
}
```

### `angular.json`

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "tornado-games": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss"
        }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:application",
          "options": {
            "outputPath": "dist/tornado-games",
            "index": "src/index.html",
            "browser": "src/main.ts",
            "polyfills": [
              "zone.js"
            ],
            "tsConfig": "tsconfig.app.json",
            "inlineStyleLanguage": "scss",
            "assets": [
              {
                "glob": "**/*",
                "input": "public",
                "output": "."
              },
              {
                "glob": "**/*",
                "input": "src/assets",
                "output": "assets"
              }
            ],
            "styles": [
              "src/styles.scss"
            ],
            "scripts": []
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kB",
                  "maximumError": "1MB"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "4kB",
                  "maximumError": "8kB"
                }
              ],
              "outputHashing": "all",
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ]
            },
            "development": {
              "optimization": false,
              "extractLicenses": false,
              "sourceMap": true
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "configurations": {
            "production": {
              "buildTarget": "tornado-games:build:production"
            },
            "development": {
              "buildTarget": "tornado-games:build:development"
            }
          },
          "defaultConfiguration": "development"
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n"
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "polyfills": [
              "zone.js",
              "zone.js/testing"
            ],
            "tsConfig": "tsconfig.spec.json",
            "inlineStyleLanguage": "scss",
            "assets": [
              {
                "glob": "**/*",
                "input": "public",
                "output": "."
              },
              {
                "glob": "**/*",
                "input": "src/assets",
                "output": "assets"
              }
            ],
            "styles": [
              "src/styles.scss"
            ],
            "scripts": []
          }
        }
      }
    }
  }
}
```

### `src/app/app.routes.ts`

```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        loadComponent: () =>
            import('./pages/home/home.component').then((m) => m.HomeComponent),
    },
    {
        path: 'game/:id',
        loadComponent: () =>
            import('./pages/game-shell/game-shell.component').then(
                (m) => m.GameShellComponent,
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./pages/game-entry/game-entry.component').then(
                        (m) => m.GameEntryComponent,
                    ),
            },
            {
                path: 'create',
                loadComponent: () =>
                    import('./pages/game-lobby/game-lobby.component').then(
                        (m) => m.GameLobbyComponent,
                    ),
            },
            {
                path: 'online',
                loadComponent: () =>
                    import('./pages/game-lobby/game-lobby.component').then(
                        (m) => m.GameLobbyComponent,
                    ),
            },
            {
                path: 'join',
                loadComponent: () =>
                    import('./pages/game-lobby/game-lobby.component').then(
                        (m) => m.GameLobbyComponent,
                    ),
            }
        ],
    },
    {
        path: '**',
        redirectTo: 'home',
    }
];
```

### `src/app/app.config.ts`

```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
```

### `src/app/app.component.ts`

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
```

### `src/app/app.component.html`

```html
<div class="app-shell">
  <router-outlet></router-outlet>
</div>
```

### `src/main.ts`

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
```

### `src/app/config/games.config.ts`

```typescript
export interface GameConfig {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  maxPlayers: number;
  route: string;
  tags?: string[];
  isActive: boolean;
}

export const GAMES: GameConfig[] = [
  {
    id: '1',
    title: 'Hangman',
    description: 'Guess the word before it\'s too late!',
    thumbnail: '/assets/images/games/hangman.png',
    maxPlayers: 3,
    route: '/game',
    tags: ['board', 'casual'],
    isActive: true
  },
];
```

### `src/app/pages/home/home.component.ts`

```typescript
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
```

### `src/app/pages/home/home.component.html`

```html
<div class="home-wrapper">
  <div class="home-header">
    <h1 class="home-title">Android</h1>
  </div>

  <div class="home-games-list">
    @for (game of games; track game.id) {
      <app-game-card [game]="game"></app-game-card>
    }
  </div>
</div>
```

### `src/app/pages/game-shell/game-shell.component.ts`

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-game-shell',
  imports: [RouterOutlet],
  templateUrl: './game-shell.component.html',
  styleUrl: './game-shell.component.scss'
})
export class GameShellComponent {

}
```

### `src/app/pages/game-shell/game-shell.component.html`

```html
<router-outlet></router-outlet>
```

### `src/app/pages/game-entry/game-entry.component.ts`

```typescript
import { Component } from '@angular/core';
import { GameConfig, GAMES } from '../../config/games.config';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-entry',
  imports: [CommonModule],
  templateUrl: './game-entry.component.html',
  styleUrls: ['./game-entry.component.scss']
})
export class GameEntryComponent {
  game! : GameConfig;


  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.game = GAMES.find(g => g.id === id)!;
  }

  quickPlay() {
    this.router.navigate(['online'], { relativeTo: this.route });
  }

  createRoom() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }

  joinRoom() {
    this.router.navigate(['join'], { relativeTo: this.route });
  }

  singlePlayer() {
    this.router.navigate(['play'], { relativeTo: this.route });
  }
}
```

### `src/app/pages/game-entry/game-entry.component.html`

```html
<div class="entry-wrapper" *ngIf="game">

  <h1 class="game-title">
    {{ game.title }}
  </h1>

  <div class="entry-actions">

    <button (click)="quickPlay()">
      QUICK PLAY
    </button>

    <button (click)="createRoom()">
      PRIVATE GAME
    </button>

    <button (click)="joinRoom()">
      JOIN GAME
    </button>

    <button (click)="singlePlayer()">
      SINGLE PLAYER
    </button>

  </div>

</div>
```

### `src/app/pages/game-lobby/game-lobby.component.ts`

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-game-lobby',
  imports: [],
  templateUrl: './game-lobby.component.html',
  styleUrl: './game-lobby.component.scss'
})
export class GameLobbyComponent {

}
```

### `src/app/pages/game-lobby/game-lobby.component.html`

```html
<p>game-lobby works!</p>
```

### `src/app/shared/components/game-card/game-card.component.ts`

```typescript
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
    this.router.navigate([this.game.route, this.game.id]);
  }
}
```

### `src/app/shared/components/game-card/game-card.component.html`

```html
<div class="game-card" (click)="openGame()">

  <div class="game-image">
    <img [src]="game.thumbnail" [alt]="game.title" />
  </div>

  <div class="game-info">
    <h2 class="game-title">{{ game.title }}</h2>

    <p class="game-description">
      {{ game.description }}
    </p>

    <div class="game-meta">
      <span class="players">
        👥 {{ game.maxPlayers }} Players
      </span>
    </div>

    @if (game.tags?.length) {
      <div class="game-tags">
        @for (tag of game.tags; track tag) {
          <span class="game-tag">{{ tag }}</span>
        }
      </div>
    }

    <button class="play-btn" (click)="openGame(); $event.stopPropagation()">
      Play
    </button>
  </div>

</div>
```

### `src/app/core/services/socket.service.ts`

```typescript
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket!: Socket;

  connect() {
    this.socket = io('http://localhost:3000');
  }

  joinRoom(roomId: string, user: any) {
    this.socket.emit('join-room', { roomId, user });
  }

  onPlayersUpdate(callback: (players: any[]) => void) {
    this.socket.on('players-update', callback);
  }

  disconnect() {
    this.socket.disconnect();
  }
}
```

### `src/app/core/services/room.service.ts`

```typescript
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Room {
  id: string;
  gameId: string;
  players: any[];
  hostId: string;
  status: 'waiting' | 'playing' | 'ended';
}

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private http: HttpClient) {}

  private baseUrl = `${environment.baseUrl}/rooms`;

  createRoom(gameId: string): Observable<Room> {
    return this.http.post<Room>(`${this.baseUrl}/create`, { gameId });
  }

  getRoom(id: string): Observable<Room> {
    return this.http.get<Room>(`${this.baseUrl}/${id}`);
  }
}
```

### `src/environments/environment.ts`

```typescript
export const environment = {
  production: false,
  appName: 'Tornado Games',
  baseUrl: 'http://localhost:3000/api',
  socketUrl: 'ws://localhost:3000',
};
```

### `src/environments/environment.prod.ts`

```typescript
export const environment = {
  production: true,
  appName: 'Tornado Games',
  apiBaseUrl: 'https://api.yourdomain.com',
  socketUrl: 'wss://socket.yourdomain.com',
};
```

## Notes

- `socket.io-client` is installed and used by `SocketService`.
- The current app is set up as a shell for multiplayer games.
- Actual multiplayer flow still requires backend connection and a complete lobby/game implementation.

## Next steps

1. Implement `play` child route and component for single-player flow.
2. Replace lobby placeholder with real lobby UI and player list.
3. Wire actual `SocketService` connect/disconnect logic into the app lifecycle.
4. Add backend room creation/join APIs and test with the `RoomService`.
5. Add actual game logic for `Hangman` or other games.
