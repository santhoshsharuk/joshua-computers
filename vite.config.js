import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/joshua-computers/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        laptops: resolve(__dirname, "laptops.html"),
        about: resolve(__dirname, "about.html"),
        product: resolve(__dirname, "product.html"),
        adminLogin: resolve(__dirname, "admin/login.html"),
        adminDashboard: resolve(__dirname, "admin/dashboard.html"),
      },
    },
  },
});
