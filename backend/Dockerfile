# Stage 1: Build the application
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Stage 2: Production image
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app ./
# Expose port 3000
EXPOSE 3000
# Start the app
CMD ["node", "src/server.js"]