import {Component, OnInit}  from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import { IBook } from './book';
import { BookService } from './book.service';
import { BookFilterPipe } from './bookFilter.pipe';
import { StarComponent } from '../shared/star.component';

@Component({
    templateUrl: 'app/books/book-list.component.html',
    styleUrls: ['app/books/book-list.component.css'],
    directives: [ROUTER_DIRECTIVES, StarComponent],
    pipes: [BookFilterPipe]
})
export class BookListComponent implements OnInit {
    pageTitle: string = 'Book List';
    listFilter: string = '';
    showImage: boolean = false;
    books: IBook[];
    errorMessage: string;

    constructor(private _bookService: BookService) {
    }

    ngOnInit() { this.getBooks(); }

    getBooks() {
        this._bookService.getBooks()
            .subscribe(
            books => this.books = books,
            error => this.errorMessage = <any>error);
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    convertToDate(dateString: string): Date {
        return new Date(dateString);
    }
}
