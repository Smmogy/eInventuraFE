import { Djelatnici } from './djelatnici';
import { Institution } from './institution';

export interface CreateInventuraDTO {
  idInventura: number;
  naziv: string;
  datumPocetka: Date;
  datumZavrsetka: Date;
  akademskaGod: number;
  usersIds: number[];
  institutionId: number;
}
