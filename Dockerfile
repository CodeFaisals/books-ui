# Use an official Node.js image as the base
FROM node:18-alpine

# Set working directory in the container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose the port Vite runs on (default: 5173)
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev", "--", "--host"]
