import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieListPageModule } from './movie-list/movie-list.module';
import { MovieListPage } from './movie-list/movie-list.page';
import { MovieStorageProvider } from './providers/movie-storage';

@NgModule({
	declarations: [AppComponent],
	entryComponents: [MovieListPage],
	imports: [
		BrowserModule,
		IonicModule.forRoot(),
		AppRoutingModule,
		MovieListPageModule,
		IonicStorageModule.forRoot()
	],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		MovieStorageProvider
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
