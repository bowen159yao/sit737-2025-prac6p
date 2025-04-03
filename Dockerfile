# Base image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the app
COPY . .

# Expose app port
EXPOSE 3000

# Run app
CMD ["node", "server.js"]
