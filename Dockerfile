FROM node:20-alpine3.22
WORKDIR /tcs-frontend
COPY package*json .
RUN npm install
COPY . . 
RUN npm run build
ENV REACT_APP_BACKENDURL=http://localhost:5000
EXPOSE 3000
CMD  ["npm","start"]