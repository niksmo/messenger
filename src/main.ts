import App from './app/app';

const root = document.getElementById('app');

if (root === null) {
  throw Error('add HTMLElement with id: #app');
}

App.initRoot(root).bootstrap();
