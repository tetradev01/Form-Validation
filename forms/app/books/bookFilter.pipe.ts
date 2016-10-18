import { Pipe, PipeTransform } from '@angular/core';
import { IBook } from './book';

@Pipe({
    name: 'bookFilter'
})
export class BookFilterPipe implements PipeTransform {

    transform(value: IBook[], filter: string): IBook[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((book: IBook) =>
            book.title.toLocaleLowerCase().search(filter) !== -1) : value;
    }
}
