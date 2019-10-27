import { MoneyOperationType } from './enums/money-operation-type.enum';


export class MoneyOperationEvent {
    id: number;
    type: MoneyOperationType;
    amount: number;
    category: number;
    date: string;
    description: string;
}

