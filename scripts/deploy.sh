#!/bin/bash

APP_DIR="/home/ubuntu/deploy"

echo "Navigating to application directory..."
cd $APP_DIR

echo "Stopping existing PM2 processes..."
pm2 delete sns_client || true

echo "Starting application..."
pm2 start ecosystem.config.js

echo "Deployment complete!"