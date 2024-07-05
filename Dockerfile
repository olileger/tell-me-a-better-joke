# Step 1: Set the base image
FROM node:20

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json files
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the remaining project files into the container
# Copy the index.js file
COPY index.js .

# Copy the views directory
COPY views ./views

# Step 6: Expose the port on which your application listens
# The port is dynamically passed when launching the container
EXPOSE $PORT

# Step 7: Set the command to start your application
CMD ["node", "index.js"]