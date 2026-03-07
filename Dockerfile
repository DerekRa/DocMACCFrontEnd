# Stage 1: Build the production files
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . .
# Generates optimized static files in /dist
RUN npm run build -- --configuration production

# Stage 2: Serve with Nginx (The Production Server)
FROM nginx:alpine

# This replaces the default Nginx config with your custom 4200 config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Replace 'your-app-name' with the actual folder name in your dist folder
COPY --from=build /app/dist/docmeyanneccorpuz /usr/share/nginx/html

# EXPOSE port 80 for the container
EXPOSE 4200

# FIX: Run Nginx instead of ng serve
CMD ["nginx", "-g", "daemon off;"]

# ==================================
# Old way but working
# ==================================
## FROM node:alpine
# FROM node:22-alpine

# WORKDIR /app

# COPY . /app

# RUN npm install -g @angular/cli

# RUN npm install

# ## CMD ["ng", "serve", "--host", "127.0.0.1"]
# CMD ["ng", "serve", "--host", "0.0.0.0"]

# EXPOSE 4200
# ==================================
# Up until here for old way
# ==================================

# ENV REACT_APP_KEYCLOAK_URL=localhost
# ==================================
# FROM nginx:alpine
# COPY /dist/docmeyanneccorpuz /usr/share/docmeyanneccorpuz/html
# ==================================
# FROM node:18.19.1 as build

# WORKDIR /app

# COPY app/dist/docmeyanneccorpuz /usr/share/nginx/html
# # COPY /dist/docmeyanneccorpuz /usr/src/app

# RUN npm install

# RUN npm install -g @angular/cli

# COPY . .

# RUN ng build --configuration=production

# # FROM nginx:latest
# FROM nginx:alpine

# COPY --from=build app/dist/docmeyanneccorpuz /usr/share/nginx/html

# EXPOSE 4200
# ==================================
