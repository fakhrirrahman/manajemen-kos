FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps --network-timeout=100000

# Copy project files
COPY . .

# Build project for production
RUN npm run build

# Expose Railway port
EXPOSE 8080

# Start production server
CMD ["npx", "next", "start", "-p", "8080"]
