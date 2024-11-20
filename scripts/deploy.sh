#!/bin/bash

APP_DIR="/home/ubuntu/deploy"

echo "Navigating to application directory..."
cd $APP_DIR

echo "Starting application..."
pm2 start ecosystem.config.js

echo "Deployment complete!"