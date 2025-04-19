import { Artikl, ArtiklInventura } from './artikl';
import { Djelatnici } from './djelatnici';
import { Institution } from './institution';
import { Prostorija } from './prostorija';

export interface Inventura {
  idInventura: number;
  naziv: string;
  datumPocetka: Date;
  datumZavrsetka: Date;
  akademskaGod: number;
  users: Djelatnici[];
  institution: Institution;
  institucijaId: number;
}

export interface InventuraList {
  idInventura: number;
  naziv: string;
  datumPocetka: Date;
  datumZavrsetka: Date;
  akademskaGod: number;
  institutionName: string;
}

export interface InventuraDetail {
  idInventura: number;
  naziv: string;
  datumPocetka: String;
  datumZavrsetka: String;
  akademskaGod: number;
  stanje: boolean;
  institution: Institution;
  prostorije: Prostorija[];
}

export interface InventuraDetailProstorija {
  idProstorija: number;
  name: string;
  inventuraStanje: boolean;
  artikls: ArtiklInventura[];
  users: Djelatnici[];
}
