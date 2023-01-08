export class BookDemo {
  constructor(book_id: number, correct_book_description: string, title_without_series: string, book_description: string, publication_year: number, publisher: string, ratings_count: number, book_average_rating: number, cover_page: string, book_url: string, is_ebook: string, num_pages: string, mod_title: string, genres: string, author_id: string, name: string, name2: string) {
    this.book_id = book_id;
    this.correct_book_description = correct_book_description;
    this.title_without_series = title_without_series;
    this.book_description = book_description;
    this.publication_year = publication_year;
    this.publisher = publisher;
    this.ratings_count = ratings_count;
    this.book_average_rating = book_average_rating;
    this.cover_page = cover_page;
    this.book_url = book_url;
    this.is_ebook = is_ebook;
    this.num_pages = num_pages;
    this.mod_title = mod_title;
    this.genres = genres;
    this.author_id = author_id;
    this.name = name;
    this.name2 = name2;
  }
  book_id?: number
  correct_book_description?: string
  title_without_series?: string
  book_description?: string
  publication_year?: number
  publisher?: string
  ratings_count?: number
  book_average_rating?: number
  cover_page?: string
  book_url?: string
  is_ebook?: string
  num_pages?: string
  mod_title?: string
  genres?: string
  author_id?: string
  name?: string
  name2?: string
}
export class ownedBooks{
id:number;
book:BookDemo;
}
