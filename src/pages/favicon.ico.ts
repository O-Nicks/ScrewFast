import type { APIRoute } from "astro";
import fs from "node:fs/promises";
import path from "node:path";

export const GET: APIRoute = async () => {
  const icoPath = path.resolve("src/images/icon.png");
  const icoBuffer = await fs.readFile(icoPath);

  return new Response(icoBuffer, {
    headers: { "Content-Type": "image/x-icon" },
  });
};
