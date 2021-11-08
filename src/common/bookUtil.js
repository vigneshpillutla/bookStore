import {
  getCoreGenres,
  getEditorsChoice,
  getBooksByFilter,
  getSingleBook,
  getAllBooks,
  getMyBooksDetails,
  getMyFavouritesDetails
} from 'apiCalls/books';

const defaultFunction = () => {};
class BookLibrary {
  getCoreGenres(done = defaultFunction) {
    getCoreGenres((response) => {
      const { coreGenres } = response;
      done(coreGenres ?? []);
    });
  }

  getEditorsChoice(done = defaultFunction) {
    getEditorsChoice((response) => {
      const { books } = response;
      done(books);
    });
  }

  getBooksByFilter(done = defaultFunction, filters) {
    getBooksByFilter((response) => {
      const { books } = response;
      done(books);
    }, filters);
  }

  getSingleBook(bookId, done = defaultFunction) {
    getSingleBook(bookId, (res) => {
      const { book } = res;
      done(book);
    });
  }

  getAllBooks(done = defaultFunction) {
    getAllBooks((res) => {
      const { books } = res;
      done(books);
    });
  }

  async getMyBooksDetails(done = defaultFunction) {
    const data = await getMyBooksDetails();
    done(data);
  }

  async getMyFavouritesDetails(done = defaultFunction) {
    const data = await getMyFavouritesDetails();
    done(data);
  }
}

export default BookLibrary;
