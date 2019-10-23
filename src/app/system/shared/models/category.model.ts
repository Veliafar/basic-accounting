export class Category {
    name: string;
    capacity: number;
    id?: number;

    constructor(name, capacity, id?) {
        this.name = name;
        this.capacity = capacity;
        if (id) { this.id = id; }
    }
}
