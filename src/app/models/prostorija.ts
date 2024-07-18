// room.ts
import { Institution } from './institution';
import { Artikl } from './artikl';

export interface Prostorija {
  id?: number;
  name: string;
  institution: Institution;
  artikls: Artikl[];
}
