import axios from 'axios';
import keys from '../configs/keys';
import { displayMsg } from 'common';
import { axiosCng } from 'common';
const serverPath = keys.serverDomain;
const bookUrl = `${serverPath}/api/books`;

const defautlFunction = () => {};

export const getCoreGenres = async (done = defautlFunction) => {
  const res = await axios.get(`${bookUrl}/coreGenres`, { ...axiosCng });
  done(res.data);
};

export const getEditorsChoice = async (done = defautlFunction, limit) => {
  let url = `${bookUrl}/editorsChoice`;
  if (!!limit) {
    url = url + `?limit=${limit}`;
  }
  const res = await axios.get(url);
  done(res.data);
};

export const getBooksByFilter = async (
  done = defautlFunction,
  filters = []
) => {
  let url = `${bookUrl}/filter?`;
  filters.forEach(([key, value]) => (url = url + `${key}=${value}&`));
  url = url.slice(0, -1);
  const res = await axios.get(url, { ...axiosCng });
  done(res.data);
};

export const getSingleBook = async (bookId, done = defautlFunction) => {
  const res = await axios.get(`${bookUrl}/${bookId}`, { ...axiosCng });
  done(res.data);
};

export const getAllBooks = async (done) => {
  const res = await axios.get(bookUrl);
  done(res.data);
};

export const getMyBooksDetails = async () => {
  const response = await axios.get(`${bookUrl}/myBooks`, {
    ...axiosCng,
    withCredentials: true
  });
  return response.data;
};

export const getMyFavouritesDetails = async () => {
  const response = await axios.get(`${bookUrl}/myFavourites`, {
    ...axiosCng,
    withCredentials: true
  });
  return response.data;
};
