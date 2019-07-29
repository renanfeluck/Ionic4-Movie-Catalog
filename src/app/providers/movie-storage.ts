import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { from, Observable } from 'rxjs';
import { Movie } from '../interface/movie';

@Injectable()
export class MovieStorageProvider {
	constructor(public storage: Storage) {}

	initStorage(): Observable<any> {
		return from(
			this.storage.get('movies').then(res => {
				if (res == undefined || res == null) {
					return this.mockMovies();
				} else {
					return res;
				}
			})
		);
	}

	mockMovies() {
		let movieList: Movie[] = [
			{
				title: 'The Shawshank Redemption',
				genre: 'Drama',
				releaseDate: '1994',
				mainActors: 'Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler',
				summarizedPlot:
					'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
				youtubeTrailer: 'http://youtube.com'
			},
			{
				title: 'Blade Runner',
				genre: 'Sci-Fi, Thriller',
				releaseDate: '1982',
				mainActors:
					'Harrison Ford, Rutger Hauer, Sean Young, Edward James Olmos',
				summarizedPlot:
					'A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.',
				youtubeTrailer: 'http://youtube.com'
			}
		];

		this.storage.set('movies', movieList);

		return movieList;
	}

	addMovie(movie: Movie): Promise<any> {
		return new Promise((resolve, reject) => {
			this.storage
				.get('movies')
				.then(resMovies => {
					let movieList: Movie[] = resMovies;
					movieList.push(movie);
					this.storage
						.set('movies', movieList)
						.then(res => {
							resolve();
						})
						.catch(err => reject());
				})
				.catch(err => reject());
		});
	}

	editMovie(movieId, newMovie) {
		return new Promise((resolve, reject) => {
			this.storage
				.get('movies')
				.then(resMovies => {
					let movieList: Movie[] = resMovies;
					movieList[movieId] = newMovie;
					this.storage
						.set('movies', movieList)
						.then(() => {
							resolve();
						})
						.catch(err => reject(err));
				})
				.catch(err => reject(err));
		});
	}

	getMovie(id: any) {
		return from(
			this.storage.get('movies').then(resMovies => {
				return resMovies[id];
			})
		);
	}
}
