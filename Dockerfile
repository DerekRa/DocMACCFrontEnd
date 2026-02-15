FROM node:22-alpine

WORKDIR /app

COPY . .

RUN npm install -g @angular/cli

RUN npm install

CMD ["ng", "serve", "--host", "127.0.0.1"]
# CMD ["ng", "serve", "--host", "0.0.0.0"]

EXPOSE 4200

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
