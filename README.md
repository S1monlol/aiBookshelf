# AI Bookshelf

Welcome to AI Bookshelf, your AI-powered personal book recommendation engine. This project is fully built using SvelteKit.

# Getting Started
For both install paths, you need to have a .env in the base dir with 
`OPENAI_KEY=`  
with your openai key included 

## Local running

To host this project, do the following:

1. Clone this repository to your local machine.
2. Install the dependencies by running the following command: `pnpm install`.
3. Start the development server by running the following command: `pnpm run dev`.

## Docker install

`docker build . -t aiBookshelf`  
`docker run -p 8080:3000 --env-file .env aibookshelf`  


# License

This project is licensed under the MIT license.