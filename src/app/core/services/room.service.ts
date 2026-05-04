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

  getAllRooms(gameId: string): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}/list?gameId=${gameId}`);
  }
}
