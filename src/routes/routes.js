import { LoginPage, SignUpPage, HomePage, ViewBook } from 'components';

const routes = [
  {
    path: '/',
    component: HomePage,
    exact: true
    // private: true
  },
  {
    path: '/books/view/:bookId',
    component: ViewBook
  },
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/signUp',
    component: SignUpPage
  }
];

export default routes;
