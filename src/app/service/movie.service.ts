import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../interface/movie';

@Injectable({
	providedIn: 'root'
})
export class MovieService {
	constructor(private http: HttpClient) {}

	setStorage(movies: Movie[]) {
		return this.http.post('http://localhost:8080/post', movies, {});
	}

	getStorage(): Observable<any> {
		return this.http.get('http://localhost:8080/movies');
	}

	getMovieFromApi(search: string): Observable<any> {
		return this.http.get('http://www.omdbapi.com/?apikey=2c6ee75c&t=' + search);
	}
}
