import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Movie } from '../interface/movie';
import { MovieStorageProvider } from '../providers/movie-storage';

@Component({
	selector: 'app-movie-list',
	templateUrl: './movie-list.page.html',
	styleUrls: ['./movie-list.page.scss']
})
export class MovieListPage implements OnInit {
	movies: Movie[];

	constructor(
		public movieStorage: MovieStorageProvider,
		private router: Router
	) {}

	ngOnInit(): void {
		this.movieStorage
			.initStorage()
			.pipe(take(1))
			.subscribe(res => {
				console.log('res', res);
				this.movies = res;
			});
	}

	ngDoCheck() {
		this.movieStorage
			.initStorage()
			.pipe(take(1))
			.subscribe(res => {
				console.log('res', res);
				this.movies = res;
			});
	}

	edit(i) {
		console.log('edit', i);

		let navigationExtras: NavigationExtras = {
			queryParams: {
				id: i
			}
		};
		this.router.navigate(['/add-movie'], navigationExtras);
	}
}
