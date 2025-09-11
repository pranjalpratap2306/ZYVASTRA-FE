# Stage 1: Build Expo web
FROM node:20-bullseye-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Build the web bundle
RUN npx expo export --platform web --output-dir dist

# Stage 2: Nginx to serve static files
FROM nginx:1.27-alpine AS runtime
# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy built static assets
COPY --from=builder /app/dist /usr/share/nginx/html
# Expose port 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 