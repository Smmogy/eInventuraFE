import { Artikl } from './artikl';

export interface Prostorija {
  idProstorija: number;
  name: string;
  idInstitution: number;
}

export interface ProstorijaUser {
  idProstorija: number;
  name: string;
  usersIds: number[];
}
