import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Search, Send, Mail, MailOpen } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export const MessagesTab = () => {
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [messages] = useState([
    {
      id: 1,
      sender: 'Алексей Иванов',
      subject: 'Вопрос по инвестициям',
      preview: 'Здравствуйте! Хотел бы обсудить возможность...',
      time: '10:30',
      unread: true,
      avatar: 'AI'
    },
    {
      id: 2,
      sender: 'Мария Петрова',
      subject: 'Предложение о сотрудничестве',
      preview: 'Добрый день! Представляю компанию...',
      time: 'Вчера',
      unread: true,
      avatar: 'МП'
    },
    {
      id: 3,
      sender: 'Дмитрий Смирнов',
      subject: 'Детали проекта',
      preview: 'Отправляю дополнительные материалы по проекту...',
      time: '2 дня назад',
      unread: false,
      avatar: 'ДС'
    },
    {
      id: 4,
      sender: 'Екатерина Волкова',
      subject: 'Встреча перенесена',
      preview: 'К сожалению, нужно перенести нашу встречу...',
      time: '3 дня назад',
      unread: false,
      avatar: 'ЕВ'
    }
  ]);

  const [replyText, setReplyText] = useState('');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
      {/* Список сообщений */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-lg">Сообщения</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск сообщений..."
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px]">
            <div className="space-y-1 p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => setSelectedMessage(message.id)}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedMessage === message.id
                      ? 'bg-accent'
                      : 'hover:bg-accent/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium text-primary">
                        {message.avatar}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className={`text-sm font-medium truncate ${
                          message.unread ? 'font-bold' : ''
                        }`}>
                          {message.sender}
                        </p>
                        {message.unread ? (
                          <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                        ) : (
                          <MailOpen className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        )}
                      </div>
                      <p className={`text-sm truncate ${
                        message.unread ? 'font-semibold' : 'text-muted-foreground'
                      }`}>
                        {message.subject}
                      </p>
                      <p className="text-xs text-muted-foreground truncate mt-1">
                        {message.preview}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {message.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Просмотр сообщения */}
      <Card className="lg:col-span-2">
        {selectedMessage ? (
          <>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle>
                    {messages.find(m => m.id === selectedMessage)?.subject}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    От: {messages.find(m => m.id === selectedMessage)?.sender}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {messages.find(m => m.id === selectedMessage)?.time}
                  </p>
                </div>
                <Badge variant={messages.find(m => m.id === selectedMessage)?.unread ? 'default' : 'secondary'}>
                  {messages.find(m => m.id === selectedMessage)?.unread ? 'Не прочитано' : 'Прочитано'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] mb-4">
                <div className="prose prose-sm max-w-none">
                  <p>
                    {messages.find(m => m.id === selectedMessage)?.preview}
                  </p>
                  <p className="mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p className="mt-4">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </div>
              </ScrollArea>

              <div className="space-y-3 border-t pt-4">
                <h4 className="text-sm font-medium">Ответить</h4>
                <Textarea
                  placeholder="Введите ваш ответ..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={4}
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setReplyText('')}>
                    Отмена
                  </Button>
                  <Button>
                    <Send className="h-4 w-4 mr-2" />
                    Отправить
                  </Button>
                </div>
              </div>
            </CardContent>
          </>
        ) : (
          <CardContent className="flex items-center justify-center h-full">
            <div className="text-center text-muted-foreground">
              <Mail className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>Выберите сообщение для просмотра</p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};