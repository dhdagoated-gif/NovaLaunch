/*global Ultraviolet*/
self.__uv$config = {
  prefix: "/go/",
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: "/assets/uv.handler.js",
  client: "/assets/uv.client.js",
  bundle: "/assets/uv.bundle.js",
  config: "/assets/uv.config.js",
  sw: "/assets/uv.sw.js",
};
