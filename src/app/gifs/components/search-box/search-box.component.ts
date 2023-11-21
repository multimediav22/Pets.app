import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { GifsService } from './../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {
  @ViewChild('txtTagInput', { static: false })
  public txtTagInput!: ElementRef<HTMLInputElement>;

  searchHistory: string[] = [];
  showHistory = false;

  constructor(private gifsService: GifsService, private elementRef: ElementRef) {}

  get tags(): string[] {
    return this.gifsService.tags;
  }

  // Función para realizar la búsqueda de etiquetas
  searchTag(newTag?: string): void {
    // Obtiene la etiqueta desde el cuadro de búsqueda o el parámetro opcional
    const tagToUse = newTag || this.txtTagInput.nativeElement.value;

    // Verifica si el cuadro de búsqueda está vacío o solo contiene espacios en blanco
    if (tagToUse.trim() === '') {
      return; // Evitar la búsqueda si el cuadro de búsqueda está vacío o solo contiene espacios en blanco
    }

    // Verifica si la etiqueta ya está en el historial antes de agregarla
    if (!this.searchHistory.includes(tagToUse)) {
      // Agrega la etiqueta al historial solo si no existe
      this.searchHistory.unshift(tagToUse);

      // Mantén un máximo de 10 elementos en el historial
      this.searchHistory = this.searchHistory.slice(0, 12);

      // Realiza la búsqueda utilizando el servicio GifsService
      this.gifsService.searchTag(tagToUse);
    }

    // Limpia el cuadro de búsqueda después de la búsqueda
    this.txtTagInput.nativeElement.value = '';

    // Oculta automáticamente la lista de historial después de buscar
    this.showHistory = false;
  }

  // Función para alternar la visibilidad del historial de búsqueda
  toggleHistory(): void {
    this.showHistory = !this.showHistory;
  }

  // Función para eliminar un elemento específico del historial
  deleteSearchHistoryItem(index: number): void {
    if (index >= 0 && index < this.searchHistory.length) {
      // Elimina el elemento en la posición index del historial
      this.searchHistory.splice(index, 1);
    }
  }

  // Función para manejar el clic en un elemento del historial
  handleClickOnHistoryItem(item: string): void {
    // Realiza la búsqueda utilizando el servicio GifsService
    this.gifsService.searchTag(item);

    // Oculta automáticamente la lista de historial después de buscar
    this.showHistory = false;
  }

  // Función para limpiar todo el historial de búsqueda
  clearSearchHistory(): void {
    this.searchHistory = [];
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    // Verifica si el clic fue dentro del componente
    const clickedInside = this.elementRef.nativeElement.contains(event.target);

    // Si se hizo clic fuera del componente y el historial está abierto, cierra el historial
    if (!clickedInside && this.showHistory) {
      this.showHistory = false;
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    // Se presionó la tecla Escape, cierra la lista de historial
    this.showHistory = false;
  }
}
