import {
  getCoreGenres,
  getEditorsChoice,
  getBooksByFilter,
  getSingleBook,
  getAllBooks
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
}

export default BookLibrary;
