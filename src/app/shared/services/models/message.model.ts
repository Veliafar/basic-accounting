export class Message {
    type: string;
    text: string;
    constructor(
        text: string,
        type: string
    ) {
        this.text = text;
        this.type = type;
    }
}