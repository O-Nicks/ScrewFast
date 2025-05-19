import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import compressor from "astro-compressor";
import starlight from "@astrojs/starlight";
import node from "@astrojs/node"; // ✅ Le bon import
import mdx from "@astrojs/mdx";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  // output: "server",
  // adapter: node({ mode: 'standalone' }), // 👈 Ajout du mode requis
  // // https://docs.astro.build/en/guides/images/#authorizing-remote-images
  site: "http://localhost:4321/",
  // site: "https://screwfast.uk",
  image: {
    domains: ["images.unsplash.com"],
  },
  // i18n: {
  //   defaultLocale: "en",
  //   locales: ["en", "fr"],
  //   fallback: {
  //     fr: "en",
  //   },
  //   routing: {
  //     prefixDefaultLocale: false,
  //   },
  // },
  prefetch: true,
  integrations: [sitemap({
    i18n: {
      defaultLocale: "en", // All urls that don't contain `fr` after `https://screwfast.uk/` will be treated as default locale, i.e. `en`
      locales: {
        en: "en", // The `defaultLocale` value must present in `locales` keys
        fr: "fr",
      },
    },
  }), starlight({
    title: "ScrewFast Docs",
    defaultLocale: "root",
    // https://github.com/withastro/starlight/blob/main/packages/starlight/CHANGELOG.md
    // If no Astro and Starlight i18n configurations are provided, the built-in default locale is used in Starlight and a matching Astro i18n configuration is generated/used.
    // If only a Starlight i18n configuration is provided, an equivalent Astro i18n configuration is generated/used.
    // If only an Astro i18n configuration is provided, the Starlight i18n configuration is updated to match it.
    // If both an Astro and Starlight i18n configurations are provided, an error is thrown.
    locales: {
      root: {
        label: "English",
        lang: "en",
      },
      de: { label: "Deutsch", lang: "de" },
      es: { label: "Español", lang: "es" },
      fa: { label: "Persian", lang: "fa", dir: "rtl" },
      fr: { label: "Français", lang: "fr" },
      ja: { label: "日本語", lang: "ja" },
      "zh-cn": { label: "简体中文", lang: "zh-CN" },
    },
    // https://starlight.astro.build/guides/sidebar/
    sidebar: [
      {
        label: "Quick Start Guides",
        translations: {
          de: "Schnellstartanleitungen",
          es: "Guías de Inicio Rápido",
          fa: "راهنمای شروع سریع",
          fr: "Guides de Démarrage Rapide",
          ja: "クイックスタートガイド",
          "zh-cn": "快速入门指南",
        },
        autogenerate: { directory: "guides" },
      },
      {
        label: "Tools & Equipment",
        items: [
          { label: "Tool Guides", link: "tools/tool-guides/" },
          { label: "Equipment Care", link: "tools/equipment-care/" },
        ],
      },
      {
        label: "Construction Services",
        autogenerate: { directory: "construction" },
      },
      {
        label: "Advanced Topics",
        autogenerate: { directory: "advanced" },
      },
    ],
    social: [
      { icon: "github", label: "GitHub", href: "https://github.com/mearashadowfax/ScrewFast" },
    ],
    disable404Route: true,
    customCss: ["./src/assets/styles/starlight.css"],
    favicon: "/favicon.ico",
    components: {
      SiteTitle: "./src/components/ui/starlight/SiteTitle.astro",
      Head: "./src/components/ui/starlight/Head.astro",
      MobileMenuFooter: "./src/components/ui/starlight/MobileMenuFooter.astro",
      ThemeSelect: "./src/components/ui/starlight/ThemeSelect.astro",
    },
    head: [
      {
        tag: "meta",
        attrs: {
          property: "og:image",
          content: "https://screwfast.uk" + "/social.webp",
        },
      },
      {
        tag: "meta",
        attrs: {
          property: "twitter:image",
          content: "https://screwfast.uk" + "/social.webp",
        },
      },
    ],
  }), compressor({
    gzip: true,
    brotli: true,
  }), mdx(), vue()],
  experimental: {
    clientPrerender: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});