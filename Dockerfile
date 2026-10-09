FROM node:20-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY public ./public
COPY server.js ./
EXPOSE 7860
CMD ["node", "server.js"]
