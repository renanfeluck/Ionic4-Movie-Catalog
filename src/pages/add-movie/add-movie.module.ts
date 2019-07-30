import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AddMoviePage } from './add-movie.page';

const routes: Routes = [
	{
		path: '',
		component: AddMoviePage
	}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild(routes),
		FormsModule,
		ReactiveFormsModule
	],
	declarations: [AddMoviePage]
})
export class AddMoviePageModule {}
