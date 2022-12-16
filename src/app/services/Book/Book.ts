export class Book{
  bookId : string
  title :string
  series :string
  author :string
  rating : number
  description :string
  language :string
  isbn :string
  genres :string
  characters :string
  bookFormat :string
  edition :string
  pages:string
  firstPublishDate :string
  publisher :string
  publishDate :string
  awards :string
  numRatings :number
  ratingsByStars :string
  likedPercent :number
  setting :string
  coverImg :string
  bbeScore :number
  bbeVotes :number
  price ?: string


  constructor(bookId: string, title: string, series: string, author: string, rating: number, description: string, language: string, isbn: string, genres: string, characters: string, bookFormat: string, edition: string, pages: string, firstPublishDate: string, publisher: string, publishDate: string, awards: string, numRatings: number, ratingsByStars: string, likedPercent: number, setting: string, coverImg: string, bbeScore: number, bbeVotes: number, price: string) {
    this.bookId = bookId;
    this.title = title;
    this.series = series;
    this.author = author;
    this.rating = rating;
    this.description = description;
    this.language = language;
    this.isbn = isbn;
    this.genres = genres;
    this.characters = characters;
    this.bookFormat = bookFormat;
    this.edition = edition;
    this.pages = pages;
    this.firstPublishDate = firstPublishDate;
    this.publisher = publisher;
    this.publishDate = publishDate;
    this.awards = awards;
    this.numRatings = numRatings;
    this.ratingsByStars = ratingsByStars;
    this.likedPercent = likedPercent;
    this.setting = setting;
    this.coverImg = coverImg;
    this.bbeScore = bbeScore;
    this.bbeVotes = bbeVotes;
    this.price = price;
  }
}
