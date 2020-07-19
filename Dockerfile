FROM node:10

# Create app directory
WORKDIR /app
ADD . /app/

# global install & update
RUN npm config set package-lock false
RUN npm i -g npm --force && npm i -g yarn --force

RUN rm yarn.lock
RUN yarn

ENV HOST 127.0.0.1
EXPOSE 3000

# start command
CMD [ "yarn", "dev" ]