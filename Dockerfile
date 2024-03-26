# Description: Dockerfile for the backend service

FROM node:20.11-bookworm-slim AS base

# Create a directory for the application and set the user
RUN mkdir -p /home/node/app \
    && chown -R node:node /home/node \
    && chmod -R 770 /home/node
WORKDIR /home/node/app


# Stage for building
FROM base AS builder

# Copy the source code to the container
COPY --chown=node:node package.json yarn.lock ./
# Set the user to node
USER node
RUN yarn
COPY . .
# Build the application
RUN yarn build


# Stage for production
FROM base AS production

WORKDIR /home/node/app
USER node
# Copy the source code to the container
COPY --chown=node:node src/db ./src/db
COPY --chown=node:node package.json yarn.lock ./
# Install the dependencies
RUN yarn
# Copy built files from the builder stage
COPY --chown=node:node --from=builder /home/node/app/dist ./dist/
# Set the environment variable
ENV NODE_ENV=prod
# Expose the port
EXPOSE 3000
# Run the application in production mode
CMD yarn migrate \
    & yarn start:prod