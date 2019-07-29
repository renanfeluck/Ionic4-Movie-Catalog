import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

@NgModule({
	declarations: [MovieDetailComponent],
	imports: [CommonModule],
	exports: [MovieDetailComponent]
})
export class ComponentsModule {}
