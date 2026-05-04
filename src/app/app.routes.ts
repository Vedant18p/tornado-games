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
