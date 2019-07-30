import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../interface/movie';
import { MovieStorageProvider } from '../providers/movie-storage';

@Component({
	selector: 'app-add-movie',
	templateUrl: './add-movie.page.html',
	styleUrls: ['./add-movie.page.scss']
})
export class AddMoviePage implements OnInit {
	public addMovieForm: FormGroup;
	private editing = false;
	private editingId: number;

	constructor(
		public formBuilder: FormBuilder,
		public movieStorage: MovieStorageProvider,
		private router: Router,
		private route: ActivatedRoute
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

	addMovie() {
		let movie = {
			title: this.addMovieForm.value.title,
			genre: this.addMovieForm.value.genre,
			releaseDate: this.addMovieForm.value.releaseDate,
			mainActors: this.addMovieForm.value.mainActors,
			summarizedPlot: this.addMovieForm.value.summarizedPlot,
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
			title: this.addMovieForm.value.title,
			genre: this.addMovieForm.value.genre,
			releaseDate: this.addMovieForm.value.releaseDate,
			mainActors: this.addMovieForm.value.mainActors,
			summarizedPlot: this.addMovieForm.value.summarizedPlot,
			youtubeTrailer: this.addMovieForm.value.youtubeTrailer
		};
		this.movieStorage.editMovie(i, movie).then(() => {
			this.router.navigate(['/']);
		});
	}

	initForm() {
		this.addMovieForm = this.formBuilder.group({
			title: [''],
			genre: [''],
			releaseDate: [''],
			mainActors: [''],
			summarizedPlot: [''],
			youtubeTrailer: ['']
		});
	}

	updateFormValues(movie: Movie) {
		this.addMovieForm = this.formBuilder.group({
			title: movie.title,
			genre: movie.genre,
			releaseDate: movie.releaseDate,
			mainActors: movie.mainActors,
			summarizedPlot: movie.summarizedPlot,
			youtubeTrailer: movie.youtubeTrailer
		});
	}
}
