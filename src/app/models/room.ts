// room.ts
import { Institution } from './institution';
import { Artikl } from './artikl';

export interface Room {
  id?: number;
  name: string;
  institution: Institution;
  artikls: Artikl[];
}
