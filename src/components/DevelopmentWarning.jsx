import { useState, useEffect } from 'react';

export default function DevelopmentWarning() {
  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [deviceType, setDeviceType] = useState('desktop'); // desktop, tablet, mobile
  const [modalWidth, setModalWidth] = useState('500px');
  const [modalHeight, setModalHeight] = useState('400px');

  // Кастомный хук для отслеживания размера окна
  const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
      width: typeof window !== 'undefined' ? window.innerWidth : 0,
      height: typeof window !== 'undefined' ? window.innerHeight : 0,
    });

    useEffect(() => {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
  };

  const { width } = useWindowSize();

  // Функция определения типа устройства и установки размеров
  const updateDeviceType = () => {
    if (width < 768) {
      // Мобильное устройство
      setDeviceType('mobile');
      setModalWidth('250px');
      setModalHeight('200px');
    } else if (width < 1024) {
      // Планшет
      setDeviceType('tablet');
      setModalWidth('350px');
      setModalHeight('300px');
    } else {
      // Десктоп
      setDeviceType('desktop');
      setModalWidth('500px');
      setModalHeight('400px');
    }
  };

  useEffect(() => {
    // Проверяем, был ли пользователь уже на сайте
    const hasVisited = localStorage.getItem('developmentWarningAcknowledged');
    
    if (!hasVisited) {
      setShowModal(true);
    }

    // Обновляем тип устройства при загрузке
    updateDeviceType();
  }, []);

  // Обновляем тип устройства при изменении размера окна
  useEffect(() => {
    updateDeviceType();
  }, [width]);

  const handleAgree = () => {
    if (isChecked) {
      localStorage.setItem('developmentWarningAcknowledged', 'true');
      setShowModal(false);
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Модальное окно */}
      <div
        style={{
          width: modalWidth,
          height: modalHeight,
        }}
        className="bg-blue-300 border-4 border-blue-600 rounded-2xl p-6 md:p-8
                   shadow-2xl flex flex-col justify-between mx-4"
      >
        
        {/* Текст */}
        <p className="text-white text-center text-xs md:text-base lg:text-lg font-medium flex-1 flex items-center justify-center">
          Сайт находится в режиме разработки и доступен только для предварительного ознакомления.
        </p>

        {/* Чек-бокс */}
        <label className="flex items-center justify-center mb-4 md:mb-6 cursor-pointer">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 mr-2 md:mr-3"
          />
          <span className="text-white text-xs md:text-sm lg:text-base font-medium">
            Понимаю и согласен
          </span>
        </label>

        {/* Кнопка */}
        <button
          onClick={handleAgree}
          disabled={!isChecked}
          className={`w-full py-1.5 md:py-2 px-3 md:px-4 rounded-lg font-semibold transition text-xs md:text-sm lg:text-base ${
            isChecked
              ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
              : 'bg-gray-400 text-gray-600 cursor-not-allowed'
          }`}
        >
          Перейти на сайт
        </button>
      </div>
    </div>
  );
}
