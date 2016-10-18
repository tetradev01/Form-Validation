import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, OnActivate, RouteSegment } from '@angular/router';

import { IBook } from './book';
import { BookService } from './book.service';
import { StarComponent } from '../shared/star.component';

@Component({
    templateUrl: 'app/books/book-detail.component.html',
    styleUrls: ['app/books/book-detail.component.css'],
    directives: [StarComponent, ROUTER_DIRECTIVES]
})
export class BookDetailComponent implements OnActivate {
    pageTitle: string = 'Book Detail';
    book: IBook;
    errorMessage: string;

    constructor(private _bookService: BookService,
                private _router: Router) {
    }

    routerOnActivate(curr: RouteSegment): void {
        let id = +curr.getParam('id');
        this.getBook(id);
    }

    getBook(id: number) {
        this._bookService.getBook(id)
            .subscribe(
                book => this.book = book,
                error => this.errorMessage = <any>error);
    }

    onBack() {
        this._router.navigate(['/books']);
    }

    convertToDate(dateString: string): Date {
        return new Date(dateString);
    }
}
