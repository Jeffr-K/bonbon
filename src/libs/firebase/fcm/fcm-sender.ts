// Pages Router 버전

import { firebaseAdmin } from "./firebase.admin.config";


export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '허용되지 않는 메소드입니다.' });
  }

  try {
    const { title, body, token } = req.body;
    
    if (!title || !body || !token) {
      return res.status(400).json({ error: '제목, 내용, 토큰이 필요합니다.' });
    }

    const message = {
      notification: {
        title,
        body,
      },
      token,
      // 선택적으로 데이터 추가
      data: {
        click_action: 'FLUTTER_NOTIFICATION_CLICK', // 모바일 앱용
        orderId: req.body.orderId || '',
      },
    };

    // FCM 메시지 전송
    const response = await firebaseAdmin.messaging().send(message);
    console.log('알림 전송 성공:', response);
    
    return res.status(200).json({ success: true, messageId: response });
  } catch (error) {
    console.error('알림 전송 중 오류:', error);
    return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
}