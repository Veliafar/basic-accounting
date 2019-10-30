import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'appFilter'
})

export class FilterPipe implements PipeTransform {
    transform(items: any, value: string, field: string): any {
        if (items.length === 0 || !value) {
            return items;
        }

        return items.filter((item) => {
            const newItem = Object.assign({}, item);
            if (!isNaN(newItem[field])) {
                newItem[field] += '';
            }

            if (field === 'type') {
                newItem[field] = newItem[field] === 'income' ? 'расход' : 'доход';
            }

            if (field === 'category') {
                newItem[field] = newItem['catName']
            }

            return newItem[field].toLowerCase().indexOf(value.toLowerCase()) !== -1;
        });
    }
}