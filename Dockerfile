# Begin by setting node:alpine as the base image
FROM node:alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Run npm install to install node modules
RUN npm install

# Copy the rest of the code to the container
COPY . .

# Define the network port that this container will listen on at runtime
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]
