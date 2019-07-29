import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { from, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class StorageService {
	constructor(private http: HTTP) {}

	getMovies(): Observable<any> {
		return from(this.http.get('http://localhost:8080/movies', {}, {}));
	}
}
