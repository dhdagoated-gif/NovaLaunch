import express from "express";
import http from "node:http";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { server as wisp } from "@mercuryworkshop/wisp-js/server";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";

const app = express();
const server = http.createServer(app);

const root = fileURLToPath(new URL(".", import.meta.url));
const publicPath = join(root, "public");
// Hugging Face Spaces (Docker) expects the app on 7860; Railway/Render inject PORT.
const port = Number(process.env.PORT) || 7860;

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

app.use(express.static(publicPath));

// Config served at a stealth path (overrides the package default).
app.get("/assets/uv.config.js", (req, res) => {
  res.sendFile(join(publicPath, "uv", "uv.config.js"));
});

app.use("/assets/", express.static(uvPath));
app.use("/core/", express.static(epoxyPath));
app.use("/lib/", express.static(baremuxPath));

app.get("/{*splat}", (req, res) => {
  res.sendFile(join(publicPath, "index.html"));
});

server.on("upgrade", (request, socket, head) => {
  if (request.url && request.url.endsWith("/sync/")) {
    wisp.routeRequest(request, socket, head);
  } else {
    socket.end();
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Nova running on port ${port}`);
});
