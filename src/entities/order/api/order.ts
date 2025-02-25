// 주문 처리 API
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '허용되지 않는 메소드입니다.' });
  }

  try {
    // 주문 데이터 처리
    const orderData = req.body;
    
    // 주문 데이터 저장 로직
    // ...
    
    // 단체 주문인지 확인 (예: 인원 수 또는 금액으로 판단)
    if (orderData.personCount > 10 || orderData.totalAmount > 100000) {
      // 사장님 FCM 토큰 가져오기 (데이터베이스에서)
      // 이 예제에서는 환경 변수에 저장된 토큰을 사용한다고 가정
      const ownerToken = process.env.OWNER_FCM_TOKEN;
      
      if (ownerToken) {
        // 내부 API를 통해 알림 전송
        const notificationRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-notification`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: '새로운 단체 주문 알림',
            body: `주문번호: ${orderData.orderId}, 금액: ${orderData.totalAmount}원, 인원: ${orderData.personCount}명`,
            token: ownerToken,
            orderId: orderData.orderId
          })
        });
        
        if (!notificationRes.ok) {
          console.error('알림 전송 실패');
        }
      }
    }
    
    return res.status(200).json({ success: true, orderId: orderData.orderId });
  } catch (error) {
    console.error('주문 처리 중 오류:', error);
    return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
}