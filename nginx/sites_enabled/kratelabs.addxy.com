# https://devcenter.heroku.com/articles/ssl-certificate-self

server {
    listen 443 ssl;
    listen [::]:443;

    server_name kratelabs.addxy.com;

    ssl_certificate /etc/letsencrypt/live/addxy.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/addxy.com/privkey.pem;

    root /usr/share/nginx/html;
}

server {
    server_name www.kratelabs.addxy;
    return 301 https://kratelabs.addxy$request_uri;
}
