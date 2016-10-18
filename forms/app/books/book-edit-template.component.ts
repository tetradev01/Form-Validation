import { Component } from '@angular/core';
import { ControlGroup } from '@angular/common';
import { ROUTER_DIRECTIVES, OnActivate, RouteSegment } from '@angular/router';

import { IBook } from './book';
import { BookService } from './book.service';

@Component({
    templateUrl: 'app/books/book-edit-template.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class BookEditTemplateComponent implements OnActivate {
    pageTitle: string = 'Edit Book';
    book: IBook;
    errorMessage: string;

    constructor(private _bookService: BookService) {
    }

    routerOnActivate(curr: RouteSegment): void {
        let id = +curr.getParam('id');
        this.getBook(id);
    }

    getBook(id: number) {
        this._bookService.getBook(id)
            .subscribe(
            book => this.onBookRetrieved(book),
            error => this.errorMessage = <any>error);
    }

    onBookRetrieved(book: IBook) {
        this.book = book;
        if (this.book.bookId === 0) {
            this.pageTitle = 'Add Book (Template-driven)';
        } else {
            this.pageTitle = `Edit Book (Template-driven): ${this.book.title}`;
        }
    }

    saveBook(editForm: ControlGroup) {
        if (editForm.dirty && editForm.valid) {
            this.book = editForm.value;
            alert(`Book: ${JSON.stringify(this.book)}`);
        }
    }
}
