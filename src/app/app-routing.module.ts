import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: 'movie-list', pathMatch: 'full' },
	{
		path: 'movie-list',
		loadChildren: '../pages/movie-list/movie-list.module#MovieListPageModule'
	},
	{
		path: 'add-movie',
		loadChildren: '../pages/add-movie/add-movie.module#AddMoviePageModule'
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
