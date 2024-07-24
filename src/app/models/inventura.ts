import { Djelatnici } from './djelatnici';
import { Institution, InstitutionDetail } from './institution';

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
  institution: InstitutionDetail;
}
