## BASE IMAGE
from node:lts-alpine as runtime

## ALL COMMANDS WILL BE EXCUTED FROM /APP
workdir /app

copy . .

run npm install 

run npm run build

env HOST=0.0.0.0

env PORT=4321

env MODE=production

expose 4321

cmd npm run start