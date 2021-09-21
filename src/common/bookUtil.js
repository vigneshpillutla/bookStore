import { getCoreGenres } from 'apiCalls/books';

const defaultFunction = () => {};
class BookLibrary {
  getCoreGenres(done = defaultFunction) {
    getCoreGenres((response) => {
      const { coreGenres } = response;
      done(coreGenres ?? []);
    });
  }
}

export default BookLibrary;
