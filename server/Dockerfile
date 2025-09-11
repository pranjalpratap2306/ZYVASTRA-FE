FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN apk add --no-cache curl \
    && npm ci --only=production
COPY . .
ENV NODE_ENV=production
EXPOSE 4000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD curl -fsS http://localhost:4000/health || exit 1
CMD ["node", "index.js"] 