import { Inventura } from './inventura';
import { Prostorija, ProstorijaDetail } from './prostorija';

export interface Institution {
  idInstitution: number;
  name: string;
  inventura: Inventura | null;
}

export interface InstitutionDetail {
  idInstitution: number;
  name: string;
  prostorijas: ProstorijaDetail[];
}
