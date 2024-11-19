#!/bin/bash

cd /home/ubuntu/SNS_Client

# 의존성 설치 (최소 설치만 필요할 경우)
echo "Installing production dependencies..."
npm install --production

echo "Starting application..."
npm run deploy

echo "Deployment complete!"