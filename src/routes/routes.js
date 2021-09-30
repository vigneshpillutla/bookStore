import { LoginPage, SignUpPage, HomePage, ViewBook, Explore } from 'components';

const routes = [
  {
    path: '/',
    component: HomePage,
    exact: true
    // private: true
  },
  {
    path: '/explore',
    component: Explore
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
