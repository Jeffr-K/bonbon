import admin from 'firebase-admin';

// Firebase Admin SDK가 이미 초기화되었는지 확인
if (!admin.apps.length) {
  // 서비스 계정 키 파일 사용 방법
  /*
  const serviceAccount = require('./service-account-key.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  */
  
  // 또는 환경 변수 사용 방법 (더 안전한 방법)
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // 개행 문자가 포함된 private key를 올바르게 처리
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    })
  });
}

export const firebaseAdmin = admin;