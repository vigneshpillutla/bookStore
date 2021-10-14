import {
  LoginPage,
  SignUpPage,
  HomePage,
  ViewBook,
  Explore,
  Cart,
  StripeContainer
} from 'components';

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
    path: '/cart',
    component: Cart,
    private: true
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
  },
  {
    path: '/temp/payment',
    component: StripeContainer,
    private: true
  }
];

export default routes;
