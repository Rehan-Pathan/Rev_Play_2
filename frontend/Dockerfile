# Stage 1 — Build Angular
FROM node:20 AS build

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

# Stage 2 — Serve with Nginx
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80