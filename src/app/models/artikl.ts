import { Prostorija } from './prostorija';

export interface Artikl {
  idArtikl: number;
  name: string;
  idProstorija: number;
  prisutan: boolean;
}

export interface ArtiklPrisutan {
  idArtikl: number;
  idInventura: number;
  prisutan: boolean;
}
