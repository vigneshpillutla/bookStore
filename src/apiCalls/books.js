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

export const getEditorsChoice = async (done = defautlFunction, limit = 30) => {
  const res = await axios.get(`${bookUrl}/editorsChoice?limit=${limit}`);
  done(res.data);
};

export const getBooksByFilter = async (
  done = defautlFunction,
  filters = []
) => {
  let url = `${bookUrl}/filter?`;
  filters.forEach(([key, value]) => (url = url + `${key}=${value}&`), {
    ...axiosCng
  });
  url = url.slice(0, -1);
  const res = await axios.get(url, { ...axiosCng });
  done(res.data);
};

export const getSingleBook = async (bookId, done = defautlFunction) => {
  const res = await axios.get(`${bookUrl}/${bookId}`, { ...axiosCng });
  done(res.data);
};
