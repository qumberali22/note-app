import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt"],
  typescript: {
    typeCheck: true,
    tsConfig: {
      include: ["./types/**/*", "./components/**/*", "./pages/**/*"],
    },
  },
  css: ["~/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  imports: {
    dirs: ["types/**/*.ts"],
  },
});
