import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { IBook } from './book';

@Injectable()
export class BookService {
    constructor(private _http: Http) { }

    private _booksUrl = 'app/books/books.json';

    getBooks() {
        return this._http.get(this._booksUrl)
            .map(res => <IBook[]> res.json())
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    getBook(id: number) {
        return this._http.get(this._booksUrl)
            .map(res => this.handleMap(res, id))
            .do(data => console.log('Data: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    private handleMap(res: any, id: number) {
        let data = <IBook[]> res.json();
        // Return an initialized object
        if (id === 0) {
            return {
                'description': '',
                'writer': '',
                'imageurl': '',
                'bookId': 0,
                'mpaa': '',
                'price': null,
                'publishDate': '',
                'starRating': null,
                'title': ''
            };
        }
        let filtered = data.filter(m => m.bookId === id);
        return <IBook> filtered[0];
    }
}
