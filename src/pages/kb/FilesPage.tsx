import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowLeft, Plus, FileText, Download, Folder } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FilesPage() {
  const navigate = useNavigate();

  const folders = [
    { id: 1, name: "Документы", files: 15 },
    { id: 2, name: "Шаблоны", files: 8 },
    { id: 3, name: "Презентации", files: 12 },
  ];

  const files = [
    { id: 1, name: "Презентация проекта.pdf", size: "2.4 MB", date: "2025-10-01" },
    { id: 2, name: "Техническое задание.docx", size: "145 KB", date: "2025-09-28" },
    { id: 3, name: "Финансовый отчет.xlsx", size: "512 KB", date: "2025-09-25" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Назад
            </Button>
            <h1 className="text-3xl font-bold">Файлы</h1>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Загрузить файл
          </Button>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Папки</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {folders.map((folder) => (
              <Card key={folder.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Folder className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium">{folder.name}</p>
                      <p className="text-sm text-muted-foreground">{folder.files} файлов</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Недавние файлы</h2>
          <div className="space-y-2">
            {files.map((file) => (
              <Card key={file.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {file.size} • {file.date}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
