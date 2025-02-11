# 🐳 Use the official Node.js 18 base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app/server

# Copy only the server folder (where package.json exists)
COPY server/package*.json ./

# Install dependencies inside the correct folder
RUN npm install

# Copy the entire server directory (to keep files organized)
COPY server .

# Expose the port the app runs on
EXPOSE 3000

# Set the default command to start the application
CMD ["npm", "run", "dev"]