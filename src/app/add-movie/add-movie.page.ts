import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from '../interface/movie';
import { MovieStorageProvider } from '../providers/movie-storage';
import { MovieService } from '../service/movie.service';

@Component({
	selector: 'app-add-movie',
	templateUrl: './add-movie.page.html',
	styleUrls: ['./add-movie.page.scss']
})
export class AddMoviePage implements OnInit {
	public addMovieForm: FormGroup;
	private editing = false;
	private editingId: number;
	movieTitle: string;
	searchText = '';
	movieSearchSubs: Subscription;
	movie: Movie;

	constructor(
		public formBuilder: FormBuilder,
		public movieStorage: MovieStorageProvider,
		private router: Router,
		private route: ActivatedRoute,
		private movieService: MovieService
	) {}

	ngOnInit() {
		this.initForm();

		this.route.queryParams.subscribe(params => {
			if (params && params.id) {
				this.editing = true;
				this.movieStorage.getMovie().subscribe(movieToEdit => {
					this.editingId = params.id;
					this.updateFormValues(movieToEdit[params.id]);
				});
			}
		});
	}

	searchMovie($event) {
		this.movieSearchSubs = this.movieService
			.getMovieFromApi($event.target.value)
			.subscribe(movieRes => {
				this.movie = <Movie>movieRes;
				this.movieTitle = movieRes.Title;
			});
	}

	autoCompleteByApi() {
		console.log(this.movie);
		this.addMovieForm.patchValue({
			Title: this.movie.Title,
			Genre: this.movie.Genre,
			Released: this.movie.Released,
			Actors: this.movie.Actors,
			Plot: this.movie.Plot
		});
	}

	addMovie() {
		let movie = {
			Title: this.addMovieForm.value.Title,
			Genre: this.addMovieForm.value.Genre,
			Released: this.addMovieForm.value.Released,
			Actors: this.addMovieForm.value.Actors,
			Plot: this.addMovieForm.value.Plot,
			youtubeTrailer: this.addMovieForm.value.youtubeTrailer
		};

		if (this.editing) {
			this.movieStorage.editMovie(this.editingId, movie).then(() => {
				this.router.navigate(['/']);
			});
		} else {
			this.movieStorage.addMovie(movie).then(() => {
				this.router.navigate(['/']);
			});
		}
	}

	editMovie(i) {
		console.log('Edit Movie');
		let movie = {
			Title: this.addMovieForm.value.Title,
			Genre: this.addMovieForm.value.Genre,
			Released: this.addMovieForm.value.Released,
			Actors: this.addMovieForm.value.Actors,
			Plot: this.addMovieForm.value.Plot,
			youtubeTrailer: this.addMovieForm.value.youtubeTrailer
		};
		this.movieStorage.editMovie(i, movie).then(() => {
			this.router.navigate(['/']);
		});
	}

	initForm() {
		this.addMovieForm = this.formBuilder.group({
			Title: [''],
			Genre: [''],
			Released: [''],
			Actors: [''],
			Plot: [''],
			youtubeTrailer: ['']
		});
	}

	updateFormValues(movie: Movie) {
		this.addMovieForm = this.formBuilder.group({
			Title: movie.Title,
			Genre: movie.Genre,
			Released: movie.Released,
			Actors: movie.Actors,
			Plot: movie.Plot,
			youtubeTrailer: movie.youtubeTrailer
		});
	}

	ngOnDestroy() {
		this.movieSearchSubs.unsubscribe();
	}
}
