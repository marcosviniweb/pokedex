import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiPokeService {
  private url: string = 'https://unpkg.com/pokemons@1.1.0/pokemons.json';

  constructor(
    private http: HttpClient
  ) { }

  getDados(){
     return this.http.get(this.url);
  }
}
