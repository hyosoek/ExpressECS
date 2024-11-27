# Dockerfile
FROM node:14

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# package.json 및 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 코드 
# 주의: image 만들 때, .env는 같이 올리지 말 것.
COPY . .

# .env 파일을 컨테이너의 환경 변수로 설정
# (이 단계는 직접적으로 환경 변수를 설정하지 않지만, 서버가 이 파일을 읽을 수 있도록 합니다)
CMD ["node", "src/server.js"]

EXPOSE 80