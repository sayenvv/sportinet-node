# Use the official Node.js image as a base image
FROM node:16-alpine

# Set the working directory
WORKDIR /home/node/code/user-service/

# Copy the package.json and package-lock.json files
COPY ./package*.json /home/node/code/
COPY ./package-lock*.json /home/node/code/

# Install the project dependencies
RUN npm install

# Copy the rest of the application files
COPY ./user-service/ /home/node/code/

# Expose the port the app runs on
EXPOSE 8000

# Set environment variables (if necessary, but typically set in docker-compose.yml or .env)
# ENV NODE_ENV=production

# # Run the application
CMD ["node", "src/index.js"]
