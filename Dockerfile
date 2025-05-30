# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy only package files to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps --network-timeout=100000

# Copy rest of the files (including prisma schema)
COPY . .

# Generate Prisma client (after schema and node_modules are present)
RUN npx prisma generate

# Expose port
EXPOSE 3000

# Start dev server
CMD ["npm", "run", "dev"]
