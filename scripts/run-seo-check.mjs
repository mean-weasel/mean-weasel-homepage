import { spawn } from "node:child_process";
import net from "node:net";
import process from "node:process";

function runAudit(baseUrl) {
  return new Promise((resolve) => {
    const audit = spawn(process.execPath, ["scripts/check-seo.mjs"], {
      env: { ...process.env, SEO_BASE_URL: baseUrl },
      stdio: "inherit",
    });
    audit.on("exit", (code) => resolve(code ?? 1));
  });
}

function availablePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      server.close(() => resolve(address.port));
    });
  });
}

async function waitForServer(url, server) {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    if (server.exitCode !== null) {
      throw new Error(`Next.js exited before the SEO audit (code ${server.exitCode})`);
    }

    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }

    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  throw new Error(`Timed out waiting for ${url}`);
}

if (process.env.SEO_BASE_URL) {
  process.exitCode = await runAudit(process.env.SEO_BASE_URL);
} else {
  const port = await availablePort();
  const baseUrl = `http://mean-weasel-homepage.127.0.0.1.nip.io:${port}`;
  const server = spawn(
    process.execPath,
    ["node_modules/next/dist/bin/next", "start", "-p", String(port)],
    { stdio: "inherit" },
  );

  try {
    await waitForServer(baseUrl, server);
    process.exitCode = await runAudit(baseUrl);
  } finally {
    server.kill("SIGTERM");
  }
}
