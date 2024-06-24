import { Djelatnici } from "./djelatnici";

export interface Inventura {
    idInventura: number;
    naziv: string;
    datumPocetka: string;
    datumZavrsetka: string;
    akademskaGod: number;
    stanje: number;
    djelatniciList: Djelatnici[];
}