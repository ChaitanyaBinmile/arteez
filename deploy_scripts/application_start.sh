#!/bin/bash
cd /var/www/job/build/src
mkdir uploads
touch .env
cp /var/.env.job /var/www/job/build/src/.env
systemctl start nginx.service
systemctl start aerohyre-job.service
systemctl enable aerohyre-job.service
