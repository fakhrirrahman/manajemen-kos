# Gunakan base image Node.js
FROM node:18

# Set working directory
WORKDIR /app

# Salin file package.json dan lock file
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps --network-timeout=100000

# Salin semua file aplikasi
COPY . .

# Jalankan build Next.js
RUN npm run build

# Railway default expects app on port 8080
EXPOSE 8080

# Jalankan Next.js dalam production mode
CMD ["npm", "run", "start"]