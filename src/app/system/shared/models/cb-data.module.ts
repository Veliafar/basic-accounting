import { CbValutes } from './cb-valutes.model';

export class CbData {
    Date: string;
    PreviousDate: string;
    PreviousURL: string;
    Timestamp: string;
    Valute: {[name: string]: CbValutes};
}