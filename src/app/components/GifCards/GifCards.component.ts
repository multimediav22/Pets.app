// Importa los módulos necesarios desde Angular
import { Component, OnInit, Input } from '@angular/core';
import { Gif } from '../../gifs/interfaces/gifs.interfaces';
import { GifsService } from '../../gifs/services/gifs.service';
@Component({
  selector: 'List-GifCards',
  templateUrl: './GifCards.component.html',
  styleUrls: ['./GifCards.component.css']
})
export class GifCardsComponent implements OnInit {
  @Input() gifs: Gif[] = [];
  historialBusquedas: string[] = [];

  constructor(private gifsService: GifsService) {} // Asegúrate de inyectar el servicio

  ngOnInit() {
    // Puedes inicializar el historial aquí si lo obtienes de algún lugar
    // this.historialBusquedas = ...
  }

  handleCheckboxChange(cardName: string) {
    // Lógica del checkbox
    // ...
  }

  handleHistorialClick(tag: string) {
    // Realiza la búsqueda correspondiente al historial
    this.gifsService.searchTag(tag); // Esto debería llamar a tu servicio para obtener los gifs
  }

  reorderCards() {
    // Lógica para reordenar las tarjetas
    console.log("Tarjeta clicada");
  }
}
