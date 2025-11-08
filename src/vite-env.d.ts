/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA4_RU_ID: string
  readonly VITE_GA4_EN_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
