/*global UVServiceWorker,__uv$config*/
importScripts("/assets/uv.bundle.js");
importScripts("/assets/uv.config.js");
importScripts("/assets/uv.sw.js");

const sw = new UVServiceWorker();

self.addEventListener("fetch", (event) => {
  event.respondWith(sw.fetch(event));
});
