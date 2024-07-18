import { Prostorija } from './prostorija';

export interface Artikl {
  id?: number;
  name: string;
  prostorija: Prostorija;
}
