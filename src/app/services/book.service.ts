import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})

export class BookService {

  private baseUrl = 'http://localhost:8080/api/books';
  constructor(private http: HttpClient) { }

  createBook(book: Book): Observable<object> {
    console.log('****** book ', book);
    return this.http.post(this.baseUrl+'/createBook', book);
  }

  updateBook(bookId: string, book: Book): Observable<object> {
    console.log('****** update book 123 ',bookId, book);
    return this.http.put(this.baseUrl+'/updateBook/'+bookId, book);
  }

  // deleteBook(bookId: string): void {
  //   console.log('****** Delete Book Service ', this.baseUrl+'/'+ bookId);
  //   this.http.delete(this.baseUrl+'/'+ bookId);
  // }

  // deleteBook(id: string): Observable<any> {
  //   console.log('****** delete book ', this.baseUrl + '/'+ id);
  //   return this.http.delete(this.baseUrl + '/'+ id);
  // }  

  deleteBook(id: string): Observable<any> {
    console.log('****** delete book ', this.baseUrl + '/'+ id);
    return this.http.delete(this.baseUrl + '/' + id);
  }
  // getBooks(): Observable<object> {
  //   return this.http.get(this.baseUrl);
  // }

  getBooks(): Observable<object> {
    return this.http.get<{books: Book[]}>(this.baseUrl).pipe(map(responseData => responseData.books))
  }

  getMyBook(id: string): Observable<object> {
    return this.http.get<{books: Book}>(this.baseUrl + '/' + id)
  }
}
