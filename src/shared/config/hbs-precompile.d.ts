declare module '*.template.hbs' {
  const src: TemplateSpecification;
  export default src;
}

declare module 'handlebars/runtime.js' {
  export = Handlebars;
}
