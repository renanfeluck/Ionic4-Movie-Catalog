import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Movie } from '../../app/interface/movie';
import { MovieStorageProvider } from '../../app/providers/movie-storage';

@Component({
	selector: 'app-movie-list',
	templateUrl: './movie-list.page.html',
	styleUrls: ['./movie-list.page.scss']
})
export class MovieListPage {
	movies: Movie[];

	movieListSubscribe: Subscription;

	constructor(
		public movieStorage: MovieStorageProvider,
		private router: Router
	) {}

	ngOnInit(): void {
		this.movieStorage
			.initStorageNode()
			.pipe(take(1))
			.subscribe(res => {
				if (res == undefined || res == null) {
					this.movieStorage.setMovieList(this.movieStorage.mockMovies());
				} else {
					this.movieStorage.setMovieList(res);
				}
			});

		this.movieListSubscribe = this.movieStorage.getMovieList().subscribe(
			res => {
				this.movies = res;
			},
			err => console.log('MovieLis error', err)
		);
	}

	edit(i) {
		let navigationExtras: NavigationExtras = {
			queryParams: {
				id: i
			}
		};
		this.router.navigate(['/add-movie'], navigationExtras);
	}

	ngOnDestroy() {
		this.movieListSubscribe.unsubscribe();
	}
}
