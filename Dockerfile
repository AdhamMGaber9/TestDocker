FROM node:14
WORKDIR /app
COPY package.json .

ARG NODE_ENV
RUN if ["$NODE_ENV"="development"]; \
    then npm install; \
    else npm install --only=production; \
    fi

COPY . .
ENV PORT 4000
EXPOSE $PORT

CMD [ "npm","start" ]


# FROM node:14 as base
# WORKDIR /app
# COPY package.json .
# RUN npm install
# COPY . .
# EXPOSE 4000
#  CMD [ "npm","run","start-dev" ]

# FROM base as development
# WORKDIR /app
# COPY package.json .
# RUN npm install
# COPY . .
# EXPOSE 4000
#  CMD [ "npm","run","start-dev" ]


# FROM base as production
# WORKDIR /app
# COPY package.json .
# RUN npm install --only=production
# COPY . .
# EXPOSE 4000
# CMD [ "npm","start" ]



# # ARG NODE_ENV
# # RUN if ["$NODE_ENV"="production"]; \
# #     then npm install --only=production; \
# #     else npm install; \
# #     fi