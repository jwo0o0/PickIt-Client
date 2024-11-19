module.exports = {
  apps: [
    {
      name: "sns_client", // 앱의 이름
      script: "npm", // Next.js 스크립트 경로
      args: "start", // Next.js 앱을 시작할 때 사용할 인수
      instances: "1", // 클러스터 모드에서 실행할 인스턴스 수 (CPU 코어 수만큼)
      autorestart: true, // 프로세스 자동 재시작 활성화
      watch: false, // 파일 변경 감지 활성화 (개발 중에만 활용)
      max_memory_restart: "1G", // 1GB 이상 메모리 사용 시 재시작
      env: {
        NODE_ENV: "production", // Node.js 환경 설정
        PORT: 3000, // 앱이 사용할 포트 번호
        NEXT_PUBLIC_PROD_API_URL: process.env.NEXT_PUBLIC_PROD_API_URL, // 환경 변수 설정
      },
    },
  ],
};
