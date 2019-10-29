import { MoneyOperationType } from './enums/money-operation-type.enum';
import { SpawnSyncOptionsWithStringEncoding } from 'child_process';


export class MoneyOperationEvent {
    id: number;
    type: MoneyOperationType;
    amount: number;
    category: number;
    date: string;
    description: string;
    catName: string;
}

