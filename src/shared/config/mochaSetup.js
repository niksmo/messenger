import { JSDOM } from 'jsdom';

const { window } = new JSDOM(
  '<!DOCTYPE html><html><head></head><body><div id="app"></div></body></html>',
  {
    url: 'http://localhost:1000',
  }
);

globalThis.window = window;
globalThis.document = window.document;
globalThis.XMLHttpRequest = window.XMLHttpRequest;
globalThis.HTMLElement = window.HTMLElement;
globalThis.HTMLUnknownElement = window.HTMLUnknownElement;
globalThis.Window = window.Window;
