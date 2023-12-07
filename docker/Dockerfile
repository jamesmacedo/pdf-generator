FROM node:18.17-alpine as base

RUN apk add --no-cache nodejs chromium qpdf

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Install fonts
RUN apk --no-cache add --virtual fonts msttcorefonts-installer fontconfig && \
	update-ms-fonts && \
	fc-cache -f && \
	apk del fonts && \
	find  /usr/share/fonts/truetype/msttcorefonts/ -type l -exec unlink {} \; \
	&& rm -rf /root /tmp/* /var/cache/apk/* && mkdir /root

# Setup app
WORKDIR /usr/var/app

COPY ../app ./

RUN rm -rf node_modules && npm install && npm cache clean --force
 
COPY . .

# Execute app
CMD ["node", "app.js"]
