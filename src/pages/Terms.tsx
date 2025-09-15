import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Terms = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Пользовательское соглашение</h1>
            <p className="text-lg text-muted-foreground">
              Условия использования платформы InvestEx
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Общие положения</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Настоящее Пользовательское соглашение (далее — "Соглашение") регулирует использование 
                  платформы InvestEx и устанавливает права и обязанности пользователей и администрации платформы.
                </p>
                <p>
                  Регистрируясь на платформе, пользователь соглашается с условиями данного соглашения 
                  и обязуется их соблюдать.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Определения</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Платформа</h4>
                  <p>Веб-сервис InvestEx, предоставляющий услуги по организации проектной работы и инвестиций.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Пользователь</h4>
                  <p>Физическое или юридическое лицо, зарегистрированное на платформе.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Проект</h4>
                  <p>Задача или комплекс задач, размещенные на платформе для поиска исполнителей.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Регистрация и аккаунт</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  3.1. Для использования функций платформы необходимо пройти регистрацию и создать аккаунт.
                </p>
                <p>
                  3.2. Пользователь обязуется предоставить достоверную информацию при регистрации.
                </p>
                <p>
                  3.3. Пользователь несет ответственность за безопасность своего аккаунта и пароля.
                </p>
                <p>
                  3.4. Запрещается создание нескольких аккаунтов одним лицом без согласования с администрацией.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Права и обязанности пользователей</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Права пользователей:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Размещение проектов на платформе</li>
                    <li>Поиск и отклик на проекты</li>
                    <li>Участие в инвестиционных возможностях</li>
                    <li>Использование инструментов платформы</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Обязанности пользователей:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Соблюдать законодательство РФ</li>
                    <li>Предоставлять достоверную информацию</li>
                    <li>Не нарушать права других пользователей</li>
                    <li>Своевременно исполнять взятые обязательства</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Финансовые операции</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  5.1. Платформа взимает комиссию 5% с каждой завершенной транзакции.
                </p>
                <p>
                  5.2. Платежи производятся через безопасные платежные системы.
                </p>
                <p>
                  5.3. Споры по платежам рассматриваются службой поддержки в течение 5 рабочих дней.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Интеллектуальная собственность</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  6.1. Все права на результаты работы принадлежат заказчику, если не оговорено иное.
                </p>
                <p>
                  6.2. Платформа не претендует на права интеллектуальной собственности пользователей.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Ответственность и ограничения</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  7.1. Платформа не несет ответственности за качество выполненных работ.
                </p>
                <p>
                  7.2. Администрация не гарантирует получение заказов или инвестиций.
                </p>
                <p>
                  7.3. Максимальная ответственность платформы ограничена суммой комиссий за последние 12 месяцев.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Заключительные положения</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  8.1. Соглашение может быть изменено администрацией с уведомлением пользователей за 7 дней.
                </p>
                <p>
                  8.2. Споры рассматриваются в соответствии с законодательством РФ.
                </p>
                <p>
                  8.3. Соглашение вступает в силу с момента регистрации пользователя на платформе.
                </p>
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

export default Terms;