import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Политика конфиденциальности</h1>
            <p className="text-lg text-muted-foreground">
              Как мы собираем, используем и защищаем ваши данные
            </p>
          </div>

          <Alert className="mb-8">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Мы серьезно относимся к защите ваших персональных данных и соблюдаем требования 
              Федерального закона №152-ФЗ "О персональных данных".
            </AlertDescription>
          </Alert>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Какие данные мы собираем</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Персональная информация:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Имя, фамилия, отчество</li>
                    <li>Адрес электронной почты</li>
                    <li>Номер телефона</li>
                    <li>Профессиональная информация</li>
                    <li>Банковские реквизиты для выплат</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Техническая информация:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>IP-адрес</li>
                    <li>Данные браузера и устройства</li>
                    <li>Информация о посещенных страницах</li>
                    <li>Время и продолжительность сессий</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Цели обработки данных</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Мы используем ваши данные для:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Предоставления услуг платформы</li>
                  <li>Обеспечения безопасности аккаунта</li>
                  <li>Связи с вами по вопросам сервиса</li>
                  <li>Улучшения качества услуг</li>
                  <li>Соблюдения правовых требований</li>
                  <li>Предотвращения мошенничества</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Правовые основания обработки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Обработка персональных данных осуществляется на основании:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Согласия субъекта персональных данных</li>
                  <li>Необходимости исполнения договора</li>
                  <li>Требований законодательства РФ</li>
                  <li>Законных интересов оператора</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Передача данных третьим лицам</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Мы можем передавать ваши данные третьим лицам только в следующих случаях:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>С вашего явного согласия</li>
                  <li>Для обработки платежей (банки, платежные системы)</li>
                  <li>По требованию государственных органов</li>
                  <li>Поставщикам технических услуг (с соблюдением конфиденциальности)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Срок хранения данных</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Персональные данные хранятся в течение:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Срока действия пользовательского соглашения</li>
                  <li>Сроков, установленных законодательством РФ</li>
                  <li>До отзыва согласия на обработку данных</li>
                </ul>
                <p>
                  После истечения сроков данные удаляются или обезличиваются.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Меры защиты данных</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Для защиты ваших данных мы применяем:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Шифрование данных при передаче (SSL/TLS)</li>
                  <li>Безопасное хранение на защищенных серверах</li>
                  <li>Ограниченный доступ сотрудников к данным</li>
                  <li>Регулярный аудит безопасности</li>
                  <li>Мониторинг несанкционированного доступа</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Ваши права</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Вы имеете право:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Получать информацию об обработке ваших данных</li>
                  <li>Требовать уточнения или удаления данных</li>
                  <li>Отзывать согласие на обработку</li>
                  <li>Ограничивать обработку данных</li>
                  <li>Обращаться в Роскомнадзор</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Cookies и аналитика</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Мы используем cookies для:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Аутентификации пользователей</li>
                  <li>Сохранения настроек</li>
                  <li>Анализа трафика и поведения пользователей</li>
                  <li>Улучшения работы сайта</li>
                </ul>
                <p>
                  Вы можете отключить cookies в настройках браузера, но это может ограничить функциональность сайта.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Контактная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  По вопросам обработки персональных данных обращайтесь:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Email: privacy@investex.com</li>
                  <li>Почтовый адрес: указать юридический адрес</li>
                  <li>Телефон службы поддержки: +7 (xxx) xxx-xx-xx</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center text-sm text-muted-foreground">
            <p>Последнее обновление: 15 сентября 2025 года</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;