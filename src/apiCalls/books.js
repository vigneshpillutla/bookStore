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
