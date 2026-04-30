/// <reference types="vite/client" />

// CSS ගොනු හඳුනා ගැනීමට
declare module "*.css";

// Vue ගොනු TypeScript හරහා හඳුනා ගැනීමට
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}