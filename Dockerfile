FROM node:4.2.2
ENV NODE_ENV 'production'
ADD ./app/package.json /tmp/package.json
ADD ./README.md /tmp/README.md
RUN cd /tmp && npm install && mv /tmp/node_modules /node_modules
RUN git clone https://github.com/eea/eea.searchserver.js /tmp/eea-searchserver
RUN cd /tmp/eea-searchserver && git checkout pam_2015
RUN npm install /tmp/eea-searchserver
ADD ./app /code
ENTRYPOINT ["/code/app.js"]
CMD ["runserver"]

