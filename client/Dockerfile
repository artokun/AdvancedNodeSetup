# if you're doing anything beyond your local machine, please pin this to a specific version at https://hub.docker.com/_/node/
FROM node:9

RUN mkdir -p /opt/app

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# default to port 5000 for node, and 5858 or 9229 for debug
ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT

# install dependencies first, in a different location for easier app bind mounting for local development
WORKDIR /opt
COPY ./package.json ./
RUN yarn && yarn cache clean --force
ENV PATH /opt/node_modules/.bin:$PATH

# copy in our source code last, as it changes the most
WORKDIR /opt/app
COPY . /opt/app

CMD [ "yarn", "start" ]