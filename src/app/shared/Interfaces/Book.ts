export class Book {
  id: number
  title: string
  author: string
  bookUrl: number
  rating: []
  description: string
  genres: string
  numOfPages: number
  publicationYear: number
  publisher: string
  coverPage: string

  constructor(id: number, title: string, author: string, bookUrl: number, rating: [], description: string, genres: string, numOfPages: number, publicationYear: number, publisher: string, coverPage: string) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.bookUrl = bookUrl;
    this.rating = rating;
    this.description = description;
    this.genres = genres;
    this.numOfPages = numOfPages;
    this.publicationYear = publicationYear;
    this.publisher = publisher;
    this.coverPage = coverPage;
  }
}

export class ownedBooks {
  id: number;
  available: boolean;
  book: Book;
}
