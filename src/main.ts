import app from 'app';

const root = document.getElementById('app');

if (root === null) {
  throw Error('add HTMLElement with id: #app');
}

root.append(app.getContent());
