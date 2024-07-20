import { Djelatnici } from './djelatnici';
import { Institution } from './institution';

export interface Inventura {
  idInventura: number;
  naziv: string;
  datumPocetka: Date;
  datumZavrsetka: Date;
  akademskaGod: number;
  djelatniciList: Djelatnici[];
  institution: Institution;
}
