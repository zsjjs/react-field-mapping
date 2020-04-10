declare interface Window {
  FieldMapping: any
}

declare module '*.less' {
  const content: {[className: string]: string};
  export default content;
}

