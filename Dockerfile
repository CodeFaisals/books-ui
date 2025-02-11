# Use an official Node.js image as the base
FROM node:18-alpine

# Set working directory in the container
WORKDIR /app

# Copy source code
COPY . .

# Install dependencies
RUN npm install

# Expose the port Vite runs on (default: 5173)
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev", "--", "--host"]

# to build for production
#CMD ["npm", "run", "build"]