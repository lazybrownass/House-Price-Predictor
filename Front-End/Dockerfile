FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Install serve to run the built application
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 5173

# Command to serve the built application
CMD ["npm", "run", "dev", "--", "--host"] 