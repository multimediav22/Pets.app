import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Agrega esta línea

import { HomepageComponent } from './pages/homepage/homepage.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { GifCardsComponent } from '../components/GifCards/GifCards.component';

@NgModule({
  declarations: [
    HomepageComponent,
    SearchBoxComponent,
    GifCardsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule  // Agrega este módulo
  ],
  exports: [
    HomepageComponent
  ]
})
export class GifsModule { }
