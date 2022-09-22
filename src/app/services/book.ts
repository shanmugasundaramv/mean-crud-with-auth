export interface Book {
  _id?: number;
  bookName: string;
  publisher: string;
  price: string;
  description: string;
  creator: {
    id?: string;
    userName?: string;
  }
}
