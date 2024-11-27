#!/bin/bash

APP_DIR="/home/ubuntu/deploy"
NVM_DIR="/home/ubuntu/.nvm"
LOG_FILE="/home/ubuntu/deploy/deploy.log"

echo "Navigating to application directory..." | tee -a $LOG_FILE
cd $APP_DIR

# NVM 환경 초기화
echo "Loading NVM environment..." | tee -a $LOG_FILE
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Node.js와 PM2 절대 경로 설정
PM2_PATH="/home/ubuntu/.nvm/versions/node/v20.9.0/bin/pm2"

# PM2 프로세스 중지
echo "Stopping existing PM2 processes..." | tee -a $LOG_FILE
$PM2_PATH delete sns_client || true | tee -a $LOG_FILE

# PM2로 애플리케이션 시작
echo "Starting application with PM2..." | tee -a $LOG_FILE
$PM2_PATH start ecosystem.config.js | tee -a $LOG_FILE

echo "Deployment complete!" | tee -a $LOG_FILE