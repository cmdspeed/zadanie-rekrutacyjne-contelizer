declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";
declare module "*.webp";
/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_GOREST_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
