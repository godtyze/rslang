export const server = 'https://rs-lang-rqoa.onrender.com/';

export const serverRoutes = {
  words: `${server}words`,
  users: `${server}users`,
  signIn: `${server}signin`
};

export enum RouteNames {
  main = '/',
  glossary = '/glossary/:group/:page',
  audioCall = '/audio-call',
  sprint = '/sprint',
  login = '/login',
  register = '/register',
  error = '*'
}
export const expireTime = 4;
export const refreshTime = 2;