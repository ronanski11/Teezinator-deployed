#Specify the base image
FROM node:14.14.0-alpine as builder

#Specify the workdir
WORKDIR /app

#Copy the package.json and package-lock.json (if exists)
COPY teezinator-client/package.json teezinator-client/package-lock.json* ./

#Install dependencies
RUN npm install

#Copy the rest of your app's source code from your project's context to the image
COPY teezinator-client/ ./

#Create build
RUN npm run build

#Start new image creation
FROM nginx

#Expose port
EXPOSE 3000

#Copy default.conf file
COPY teezinator-client/nginx/default.conf /etc/nginx/nginx.conf

#Copy files from the previous image
COPY --from=builder /app/build /usr/share/nginx/html
