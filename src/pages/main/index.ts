import { MainPage } from './main-page';
import { chatWidget } from 'widgets/chat-widget';
import { sideWidget } from 'widgets/side-widget';

const mainPage = new MainPage({ chatWidget, sideWidget });

export { mainPage };
