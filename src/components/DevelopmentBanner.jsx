import { useEffect, useState } from 'react';

export default function DevelopmentBanner() {
  const [isAcknowledged, setIsAcknowledged] = useState(false);

  useEffect(() => {
    // Проверяем, согласился ли пользователь
    const hasAcknowledged = localStorage.getItem('developmentWarningAcknowledged');
    if (hasAcknowledged) {
      setIsAcknowledged(true);
    }
  }, []);

  if (!isAcknowledged) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-blue-900 text-white py-4 z-40">
      <div className="text-center text-3xl font-semibold">
        Сайт находится в режиме разработки и доступен только для предварительного ознакомления
      </div>
    </div>
  );
}
