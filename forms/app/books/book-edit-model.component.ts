import { Component } from '@angular/core';
import { FormBuilder, ControlGroup, Control, Validators } from '@angular/common';
import { ROUTER_DIRECTIVES, OnActivate, RouteSegment } from '@angular/router';

import { IBook } from './book';
import { BookService } from './book.service';

@Component({
    templateUrl: 'app/books/book-edit-model.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class BookEditModelComponent implements OnActivate {
    pageTitle: string = 'Edit Book';
    editForm: ControlGroup;
    titleControl: Control;
    writerControl: Control;
    book: IBook;
    errorMessage: string;

    constructor(private _fb: FormBuilder,
        private _bookService: BookService) {

        this.titleControl = new Control('', Validators.compose([Validators.required,
                                                                Validators.minLength(3),
                                                                Validators.maxLength(50)]));
        this.writerControl = new Control('', Validators.compose([Validators.required,
                                                                Validators.minLength(5),
                                                                Validators.maxLength(50)]));
        this.editForm = this._fb.group({
            'title': this.titleControl,
            'writer': this.writerControl
        });
    }

    routerOnActivate(curr: RouteSegment): void {
        let id = +curr.getParam('id');
        this.getBook(id);
    }

    getBook(id: number) {
        this._bookService.getBook(id)
            .subscribe(
            (book: IBook) => this.onGetBook(book),
            (error: any) => this.errorMessage = <any>error);
    }

    onGetBook(book: IBook) {
        this.book = book;
        if (this.book.bookId === 0) {
            this.pageTitle = 'Add Book (Model-driven)';
        } else {
            this.pageTitle = `Edit Book (Model-driven): ${this.book.title}`;
        }

    }

    saveBook() {
        if (this.editForm.dirty && this.editForm.valid) {
            this.book = this.editForm.value;
            alert(`Book: ${JSON.stringify(this.book)}`);
        }
    }
}
