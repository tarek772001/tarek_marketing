# Licorne Academy Dockerized

Successful Deployment ! 🚀

## Commands to use :

`npm run server` : to run backend only

`npm run client` : to run frontend only

`npm run dev` : to run backend and front end at the same time (by using conccurently)

`npm run data:import` : import data to MongoDb

`npm run data:destroy` : destroy data in MongoDb

- Method Payment :
  :

```bash
- Click To Pay ✔️  ( Tunisian Payment Method )  Already Done ⌛
- Stripe ⚠️ ( Global Payment Method ) Not Implimented Yet ⏳ (Soon)
- Paypal ❌ ( Global Payment Method ) Not Implimented Yet ⏳ (Soon)
```

## Useful Docker Commands :

To Remove Container :

```bash
sudo docker rm -f "Name Of Container"
```

To View List Of Container :

```bash
sudo docker container ls
```

To Create An Image :

```bash
sudo docker-compose up --build -d
```

## Nginx :

**To generate build Folder For Nginx** : we need to run `npm run build` in the frontend folder

**To remove the old folder** : `rm -rf licorne_academy_trk-Dockerized`
**To remove the old folder** : `rm -rf build`

**We move it to** `/var/www` **by the command** :

```bash
sudo mv /home/test/licorne_academy_trk-Dockerized/frontend/build   /var/www
```

**cd /etc/nginx**

**cd /sites-available/**

**nano test.eshop**

**nginx -t** (test the syntax of the file we created )

**systemctl restart nginx**

**Symbolic Link** Between `/sites-available/` and `/sites-enabled/` :

```bash
ln -s /etc/nginx/sites-available/test.eshop /etc/nginx/sites-enabled/test.eshop
```

**cd sites-enabled/**

**nano test.eshop**

## Script Of test.eshop File:

**Code** :

```bash
 server {
    server_name licorne-academy.store;
    location / {
      root /var/www/build;
      index index.htm index.html;
    }
    location /api {
        proxy_pass http://licorne-academy.store:5000/api;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        add_header 'Access-Control-Allow-Origin' 'https://licorne-academy.store/';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE';
        add_header 'Access-Control-Allow-Headers' 'Origin, X-Requested-With, Content-Type, Accept';
   }

    location /uploads {
        alias /app/uploads/;
        try_files $uri $uri/ /index.html;
        add_header 'Access-Control-Allow-Origin' 'https://licorne-academy.store/';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE';
        add_header 'Access-Control-Allow-Headers' 'Origin, X-Requested-With, Content-Type, Accept';
   }    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/licorne-academy.store/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/licorne-academy.store/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}

server {
    if ($host = licorne-academy.store) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen 80;
    server_name  licorne-academy.store;
    return 404; # managed by Certbot


}

```

See you soon !
