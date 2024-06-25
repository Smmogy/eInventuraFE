import { Djelatnici } from './djelatnici';

export interface Inventura {
  idInventura: number;
  naziv: string;
  datumPocetka: Date;
  datumZavrsetka: Date;
  akademskaGod: number;
  stanje: number;
  djelatniciList: Djelatnici[];
}
