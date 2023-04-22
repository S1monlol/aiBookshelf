FROM node:19

RUN npm i -g pnpm@7.30.0

# pnpm fetch does require only lockfile
COPY pnpm-lock.yaml ./

# RUN pnpm fetch --prod

ADD . ./
RUN pnpm install 

RUN pnpm run build

EXPOSE 8080
CMD ["node", "-r", "dotenv/config", "build"]