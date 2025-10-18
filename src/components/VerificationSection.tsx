import { Search, EyeOff, FolderOpen } from "lucide-react";

const VerificationSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-4">
          Прозрачность и верификация: Инвестируйте с уверенностью
        </h2>
        <p className="text-xl text-muted-foreground text-center max-w-4xl mx-auto mb-12">
          Наша интегрированная система управления проектами гарантирует, что данные, которые вы видите, 
          соответствуют реальному положению дел.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop" 
              alt="Верификация данных" 
              className="max-w-full w-96 rounded-3xl mx-auto shadow-lg"
            />
          </div>
          
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="text-4xl text-primary">
                <Search size={32} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Автоматическая верификация</h3>
                <p className="text-muted-foreground">
                  Проекты, использующие нашу внутреннюю систему управления, проходят постоянный анализ. 
                  Все задачи, KPI и финансовые потоки верифицируются AI-алгоритмами.
                </p>
              </div>
            </div>
            
            <div className="flex gap-6 items-start">
              <div className="text-4xl text-primary">
                <EyeOff size={32} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Контролируемый доступ</h3>
                <p className="text-muted-foreground">
                  Потенциальный инвестор видит только тот объем информации, которым фаундер готов поделиться 
                  через защищенную комнату данных.
                </p>
              </div>
            </div>
            
            <div className="flex gap-6 items-start">
              <div className="text-4xl text-primary">
                <FolderOpen size={32} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Полная прозрачность для партнеров</h3>
                <p className="text-muted-foreground">
                  После подписания NDA и вхождения в сделку, вы получаете доступ ко всему рабочему пространству проекта, 
                  включая командную переписку, становясь полноценным участником процесса.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerificationSection;