FROM node:20-slim

RUN apt-get update -y && apt-get install -y openssl
RUN yarn global add @nestjs/cli

WORKDIR /home/node/app

USER node

CMD ["tail" ,"-f" ,"/dev/null"]