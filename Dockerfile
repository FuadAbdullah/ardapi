# Use Node version 20
FROM node:20

# Set the environment variables
ENV ARDAPI_BASE_URL=/ardapi/v1
ENV PORT=3000

# Set working dir
WORKDIR /usr/src/app

# Copy server files
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the files
COPY . .

# Expose server port
EXPOSE 3000

# Run command
CMD ["node", "server.js"]

