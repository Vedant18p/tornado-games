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