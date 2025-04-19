import { Prostorija } from './prostorija';

export interface Artikl {
  idArtikl: number;
  name: string;
  idProstorija: number;
}

export interface ArtiklInventura {
  idArtikl: number;
  name: string;
  prisutan: boolean;
}

export interface ArtiklPrisutan {
  idArtikl: number;
  idInventura: number;
  prisutan: boolean;
}
