# Use the official Node.js 14 image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN yarn install --prod --frozen-lockfile

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN yarn run build

# Expose the port that the application will listen on
EXPOSE 5000

# Start the application
CMD ["yarn", "run", "start:prod"]