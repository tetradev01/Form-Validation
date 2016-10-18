import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';
import { BookListComponent } from './books/book-list.component';
import { BookDetailComponent } from './books/book-detail.component';
import { BookEditComponent } from './books/book-edit.component';
import { BookEditTemplateComponent } from './books/book-edit-template.component';
import { BookEditModelComponent } from './books/book-edit-model.component';
import { BookService } from './books/book.service';

@Component({
    selector: 'mh-app',
    template: `
    <div class="container">
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <a class="navbar-brand">{{pageTitle}}</a>
                <ul class="nav navbar-nav">
                    <li><a [routerLink]="['/welcome']">Home</a></li>
                    <li><a [routerLink]="['/books']">Book List</a></li>
                    <li><a [routerLink]="['/bookEdit', 0]">Add Book</a></li>
                </ul>
            </div>
        </nav>
        <div class="container">
            <router-outlet></router-outlet>
        </div>
     </div>
     `,
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        HTTP_PROVIDERS,
        BookService
    ]
})
@Routes([
    { path: '/', component: WelcomeComponent },
    { path: '/welcome', component: WelcomeComponent },
    { path: '/books', component: BookListComponent },
    { path: '/book/:id', component: BookDetailComponent },
    { path: '/bookEdit/:id', component: BookEditComponent },
    { path: '/bookEditTemplate/:id', component: BookEditTemplateComponent },
    { path: '/bookEditModel/:id', component: BookEditModelComponent }
])
export class AppComponent {
    pageTitle: string = 'Book Heaven';
}
