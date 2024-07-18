import { Inventura } from './inventura';

export interface Institution {
  idInstitution: number;
  name: string;
  inventura: Inventura | null;
}
