import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "http://mean-weasel-homepage.127.0.0.1.nip.io:3100",
    channel: "chrome",
  },
  webServer: {
    command: "npm run dev -- --hostname 0.0.0.0 --port 3100",
    url: "http://mean-weasel-homepage.127.0.0.1.nip.io:3100",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
