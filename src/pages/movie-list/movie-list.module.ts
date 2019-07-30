import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../app/components/components.module';
import { MovieListPage } from './movie-list.page';

const routes: Routes = [
	{
		path: '',
		component: MovieListPage
	}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild(routes),
		ComponentsModule
	],
	declarations: [MovieListPage]
})
export class MovieListPageModule {}
