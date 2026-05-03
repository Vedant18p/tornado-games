export interface GameConfig {
  id: string;
  title: string;
  overview: string;
  description: string;
  thumbnailUrl: string;
  banners: string[];
  maxPlayers: number;
  route: string;
  tags?: string[];
  isActive: boolean;
}

export const GAMES: GameConfig[] = [
  {
    id: 'hangman', // more meaningful than '1'
    title: 'Hangman',
    overview: 'A fast-paced multiplayer word guessing game.',
    description: 'Each round provides a hint about the word’s category, and players must guess the hidden word letter by letter within a limited time and a fixed number of wrong attempts. Every alphabet can be selected only once, so choose wisely. Compete against other players in real-time and be the first to correctly guess the word to win the round.',
    thumbnailUrl: '/assets/images/games/hangman.png',

    banners: [
      '/assets/images/games/1.jpg',
      '/assets/images/games/2.jpg',
      '/assets/images/games/3.jpg',
      '/assets/images/games/4.JPG',
      '/assets/images/games/5.png',
      '/assets/images/games/6.png',
      '/assets/images/games/7.jpg',
      '/assets/images/games/8.png',
      '/assets/images/games/9.png',
      '/assets/images/games/10.png',
    ],
    maxPlayers: 4, // slightly better for group play

    route: '/game/hangman', // more specific routing

    tags: ['word', 'puzzle', 'casual', 'multiplayer'],

    isActive: true,
  },
];
