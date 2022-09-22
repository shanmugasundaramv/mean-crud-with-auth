import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Book } from 'src/app/services/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books!: any;
  books$!: Observable<any>
  userId: string = "";
  paramId: string = "";
  invalidUser: boolean = false;
  constructor(private bookService: BookService, private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.invalidUser = false;
    this.userId = this.authService.getIsAuth().id;
    this.paramId = this.route.snapshot.params['id'];
    // this.books$ = this.bookService.getBooks().pipe(map((book: any) => {
    //   console.log("****** book user ame ", book, this.userName)
    //   return book.userName == this.userName
    // }));
    // this.books$.subscribe(book => console.log("****** book ", book)); 

    this.bookService.getBooks().subscribe(response => {
      this.books = response;
      if(this.paramId) {
        if(this.paramId == this.userId) {
          this.books = this.books.filter((book: any) => book.creator.id == this.userId);
        } else {
          this.invalidUser = true;
          this.books = [];
        } 
      }   
    });
 
  }

  removeBook(bookId: string) {
    console.log("****** bookId ", bookId)
    this.bookService.deleteBook(bookId).subscribe(data => {
      console.log("****** data ", data);
      this.books = this.books.filter((book: any) => book.id != bookId)
    })
  }

  editBook(bookId: string) {
    this.router.navigate([`/update-book/${bookId}`])
  }
}
