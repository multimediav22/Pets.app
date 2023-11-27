import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {
  // Historial de búsqueda
  private _historial: string[] = [];
  private apikey: string = 'PkV7vqAtj9kWeDEUkayyww9ydb7RWZuA';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  public gifCards: Gif[] = [];

  get tags(): string[] {
    // Lógica para obtener las etiquetas desde tu servicio
    return ['tag1', 'tag2', 'tag3']; // Reemplaza esto con la lógica real
  }

  constructor(private http: HttpClient) {
    this.loadLocalStorage();

    }

  // Getter para obtener una copia del historial
  get historial() {
    return [...this._historial];
  }

  // Método privado para organizar el historial
  private async organizeHistorial(tag: string): Promise<void> {
    // Convertir la etiqueta a minúsculas
    tag = tag.toLowerCase();

    // Verificar si la etiqueta ya está en el historial y eliminarla
    if (this._historial.includes(tag)) {
      this._historial = this._historial.filter((oldTag) => oldTag !== tag);
    }

    // Agregar la etiqueta al principio del historial
    this._historial.unshift(tag);

    // Mantener el historial con un máximo de 5 elementos
    this._historial = this._historial.splice(0, 5);
    this.saveLocalStorage();
  }
  private saveLocalStorage(): void {

    localStorage.setItem('historial', JSON.stringify(this._historial));
  }
  private loadLocalStorage(): void {
    const storedHistorial = localStorage.getItem('historial');

    if (storedHistorial) {
      this._historial = JSON.parse(storedHistorial);

      if (this._historial.length > 0) {
        // Obtener el último elemento del historial y realizar una búsqueda al cargar
        this.searchTag(this._historial[0]);
      }
    }
  }


  // Método público para realizar una búsqueda con etiqueta
  public searchTag(tag: string): void {
    // Verificar si la etiqueta es válida (no está vacía)
    if (tag.length === 0) return;
    tag = tag.toLowerCase();

    // Verificar si la etiqueta es válida (no está vacía) y es una de las opciones permitidas
    const allowedTags = ['perro', 'gato', 'pets', 'mascotas', 'dogs', 'dog', 'cats','cat', 'Persa', 'pet','Royal canin',
    'Siames',
    'Maine Coon',
    'Bengal',
    'Sphynx',
    'Ragdoll',
    'British', 'Shorthai',
    'Abyssinian',
    'Scottish Fold',
    'Birmano', 'parrot', 'bird',];
    if (tag.length === 0 || !allowedTags.includes(tag)) {
      console.warn('La búsqueda solo es válida para "perro", "gato", "pets" o "mascotas".');
      return;
    }
    // Llamar al método privado para organizar el historial
    this.organizeHistorial(tag);

    // Crear parámetros para la solicitud HTTP utilizando HttpParams
    const params = new HttpParams()
      .set('api_key', this.apikey)
      .set('limit', '10')
      .set('q', tag);

    // Realizar la solicitud a la API utilizando HttpClient y mostrar los resultados en la consola
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((resp) => {
        console.log(resp);
        this.gifCards = resp.data;
        //console.log({gifs: this.gifCards});
        // Aquí puedes manejar la respuesta de la API según tus necesidades
      });
  }
}
