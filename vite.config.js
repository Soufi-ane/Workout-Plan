import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
// https://vitejs.dev/config/
export default defineConfig({
    base: "/Workout-Plan/",
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            includeAssets: [],
            manifest: {
                name: "Workout Plan",
                short_name: "W-Plan",
                description: "An App to help you organize your workouts",
                theme_color: "#ffffff",
                icons: [
                    {
                        src: "gym.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                ],
            },
        }),
    ],
});
