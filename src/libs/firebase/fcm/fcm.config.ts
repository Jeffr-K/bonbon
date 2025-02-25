import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);

let messaging = null;
if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
  messaging = getMessaging(firebaseApp);
}

export const requestForToken = async () => {
  try {
    if (!messaging) return null;
    
    // 알림 권한 요청
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.log('알림 권한이 거부되었습니다.');
      return null;
    }
    
    // FCM 토큰 생성
    const token = await getToken(messaging, {
      vapidKey: 'YOUR_VAPID_KEY' // Firebase 프로젝트 설정에서 생성한 Web Push 인증서 키
    });
    
    console.log('FCM 토큰:', token);
    return token;
  } catch (error) {
    console.error('FCM 토큰 생성 중 오류:', error);
    return null;
  }
};

// 포그라운드 메시지 수신 설정
export const onMessageListener = () => {
  return new Promise((resolve) => {
    if (!messaging) return resolve(null);
    
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
};

export default firebaseApp;