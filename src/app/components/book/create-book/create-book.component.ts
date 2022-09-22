import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/services/book';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {


  bookForm!: FormGroup;
  errorMessage: string = "";
  private authStatusSubscription!: Subscription;
  paramId: string = "";
  userId: string = "";
  bookData!: Book;
  constructor(private fb: FormBuilder, private bookService: BookService, private authService: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.bookForm = this.fb.group({
      bookName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_ ]{2,}$')]],
      publisher: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]{2,}$')]],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      description: ['', [Validators.required]]
  });
  this.paramId = this.route.snapshot.params['id'];
  console.log("****** this.paramId ", this.paramId);
  if(this.paramId) {
    this.bookService.getMyBook(this.paramId).subscribe(book => {
      this.bookForm.patchValue(book);
    });
  }
  console.log("****** this.userId ", this.userId)
  this.userId = this.authService.getIsAuth().id;
  console.log("****** this.userId ", this.userId)
  this.authService
  .getAuthStatusListener()
  .subscribe(userData => {
    console.log("****** userData ", userData)
    this.userId = userData.id;
    console.log("****** this.userId ", this.userId)
  });  
}

get bookFormFn(): any { return this.bookForm.controls; }


onSubmit() {
  console.log(this.bookForm.value);
  this.bookData = { ...this.bookForm.value, creator: this.userId }
  if(this.paramId) {
    this.bookService.updateBook(this.paramId, this.bookData).subscribe(data =>
      { 
        console.log("****** update book", data)
        this.gotoBookList();
      },
      error => {
        this.errorMessage = error.error.message
      });
  } else {
    this.bookService.createBook(this.bookData).subscribe(data =>
      { 
        this.gotoBookList();
      },
      error => {
        this.errorMessage = error.error.message
      });
  }
}

gotoBookList() {
  this.router.navigate([`/books/${this.userId}`]);
}
// ngOnDestroy() {
//   this.authStatusSubscription.unsubscribe();
// }

}
