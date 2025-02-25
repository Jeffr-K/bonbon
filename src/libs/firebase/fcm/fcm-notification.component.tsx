import { useEffect, useState } from 'react';
import { onMessageListener, requestForToken } from './fcm.config';

const FCMNotification = () => {
  const [notification, setNotification] = useState({ title: '', body: '' });

  useEffect(() => {
    // 컴포넌트 마운트 시 FCM 토큰 요청
    const getFCMToken = async () => {
      const token = await requestForToken();
      if (token) {
        // 토큰을 서버에 저장하는 API 호출
        // 이 토큰이 사장님 디바이스의 토큰이 됩니다
        try {
          await fetch('/api/register-fcm-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
          });
          console.log('FCM 토큰이 서버에 등록되었습니다.');
        } catch (error) {
          console.error('FCM 토큰 등록 실패:', error);
        }
      }
    };

    getFCMToken();

    // 포그라운드 메시지 수신 리스너 설정
    const messageListener = onMessageListener().then((payload: any) => {
      if (payload) {
        setNotification({
          title: payload.notification.title,
          body: payload.notification.body
        });
        
        // 브라우저 알림 표시 (선택 사항)
        if (Notification.permission === 'granted') {
          new Notification(payload.notification.title, {
            body: payload.notification.body
          });
        }
      }
    });

    return () => {
      messageListener.catch(err => console.log('failed: ', err));
    };
  }, []);

  return (
    <div>
      {notification.title && (
        <div className="notification-popup">
          <h3>{notification.title}</h3>
          <p>{notification.body}</p>
        </div>
      )}
    </div>
  );
};

export default FCMNotification;