import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { from, Observable, ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Movie } from '../interface/movie';
import { MovieService } from '../service/movie.service';

@Injectable()
export class MovieStorageProvider {
	movieList: ReplaySubject<Movie[]> = new ReplaySubject();

	constructor(public storage: Storage, private movieService: MovieService) {}

	setMovieList(movies: Movie[]) {
		this.movieList.next(movies);
	}

	getMovieList() {
		return this.movieList.asObservable();
	}

	initStorage(): Observable<any> {
		return from(
			this.storage
				.get('movies')
				.then(res => {
					if (res == undefined || res == null) {
						return this.mockMovies();
					} else {
						return res;
					}
				})
				.catch(err => {
					console.log(err);
				})
		);
	}

	initStorageNode(): Observable<Movie[]> {
		return this.movieService.getStorage();
	}

	mockMovies() {
		console.log('Mock');
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
		this.movieService.setStorage(movieList).subscribe(
			res => {
				console.log('MovieService', res);
			},
			err => {
				console.log(err);
			}
		);

		this.storage.set('movies', movieList).catch(err => {
			console.log(err);
		});

		return movieList;
	}

	addMovie(movie: Movie): Promise<any> {
		return new Promise((resolve, reject) => {
			this.storage
				.get('movies')
				.then(resMovies => {
					let movieList: Movie[] = resMovies;
					movieList.push(movie);

					this.movieService.setStorage(movieList).subscribe(
						res => {
							console.log('MovieService', res);
							this.setMovieList(movieList);
						},
						err => {
							console.log(err);
						}
					);

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

					this.movieService
						.setStorage(movieList)
						.pipe(take(1))
						.subscribe(
							res => {
								console.log('MovieService', res);
								this.setMovieList(movieList);
							},
							err => {
								console.log('Movie list', movieList);
								console.log('Edit Movie error', err);
							}
						);

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

	getMovie() {
		return this.movieService.getStorage();
		// return from(
		// 	this.storage.get('movies').then(resMovies => {
		// 		return resMovies[id];
		// 	})
		// );
	}
}
