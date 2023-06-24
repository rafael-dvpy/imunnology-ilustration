FROM node:18

RUN apt install git

USER node

WORKDIR /home/node/app

CMD [ "/home/node/app/start.sh"]