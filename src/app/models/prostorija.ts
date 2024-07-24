// room.ts
import { Institution } from './institution';
import { Artikl } from './artikl';

export interface Prostorija {
  idProstorija: number;
  name: string;
  idInstitution: number;
  artikls: Artikl[];
}
export interface ProstorijaDetail {
  idProstorija: number;
  name: string;
  artikls: Artikl[];
}
