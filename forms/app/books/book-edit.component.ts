import { Component } from '@angular/core';
import { FormBuilder, ControlGroup, Control, Validators } from '@angular/common';
import { ROUTER_DIRECTIVES, OnActivate, RouteSegment } from '@angular/router';

import { IBook } from './book';
import { BookService } from './book.service';
import { NumberValidator } from '../shared/number.validator';

@Component({
    templateUrl: 'app/books/book-edit.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class BookEditComponent implements OnActivate {
    pageTitle: string = 'Edit Book';
    editForm: ControlGroup;
    titleControl: Control;
    formError: { [id: string]: string };
    private _validationMessages: { [id: string]: { [id: string]: string } };
    book: IBook;
    errorMessage: string;

    constructor(private _fb: FormBuilder,
        private _bookService: BookService) {

        // Initialization of strings
        this.formError = {
            'title': '',
            'writer': '',
            'starRating': '',
            'description': ''
        };

        this._validationMessages = {
            'title': {
                'required': 'Book title is required',
                'minlength': 'Book title must be at least three characters.',
                'maxlength': 'Book title cannot exceed 50 characters.'
            },
            'writer': {
                'required': 'Writer is required',
                'minlength': 'Writer must be at least 5 characters.',
                'maxlength': 'Writer cannot exceed 50 characters.'
            },
            'starRating': {
                'range': 'Rate the book between 1 (lowest) and 5 (highest).'
            }
        };
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
            this.pageTitle = 'Add Book';
        } else {
            this.pageTitle = `Edit Book: ${this.book.title}`;
        }

        this.titleControl = new Control(this.book.title, Validators.compose([Validators.required,
                                                                Validators.minLength(3),
                                                                Validators.maxLength(50)]));
        this.editForm = this._fb.group({
            'title': this.titleControl,
            'writer': [this.book.writer,
                Validators.compose([Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(50)])],
            'starRating': [this.book.starRating,
                NumberValidator.range(1, 5)],
            'description': [this.book.description]
        });

        this.editForm.valueChanges
            .map(value => {
                // Causes infinite loop
                // this.titleControl.updateValue(value.title.toUpperCase());
                value.title = value.title.toUpperCase();
                return value;
            })
            .subscribe(data => this.onValueChanged(data));
        // this.editForm.valueChanges
        //         .debounceTime(500)
        //         .subscribe(data => this.onValueChanged(data));
    }

    onValueChanged(data: any) {
        for (let field in this.formError) {
            if (this.formError.hasOwnProperty(field)) {
                let hasError = this.editForm.controls[field].dirty &&
                    !this.editForm.controls[field].valid;
                this.formError[field] = '';
                if (hasError) {
                    for (let key in this.editForm.controls[field].errors) {
                        if (this.editForm.controls[field].errors.hasOwnProperty(key)) {
                            this.formError[field] += this._validationMessages[field][key] + ' ';
                        }
                    }
                }
            }
        }
    }

    saveBook() {
        if (this.editForm.dirty && this.editForm.valid) {
            this.book = this.editForm.value;
            alert(`Book: ${JSON.stringify(this.book)}`);
        }
    }
}
