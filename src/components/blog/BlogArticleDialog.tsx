import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BlogArticleEditor } from './BlogArticleEditor';
import { PenSquare } from 'lucide-react';

interface BlogArticleDialogProps {
  children?: React.ReactNode;
  trigger?: React.ReactNode;
}

export const BlogArticleDialog = ({ children, trigger }: BlogArticleDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || children || (
          <button className="flex items-center gap-2 w-full">
            <PenSquare className="h-4 w-4" />
            Написать статью
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Создать статью блога</DialogTitle>
          <DialogDescription>
            Ваша статья будет отправлена на модерацию перед публикацией
          </DialogDescription>
        </DialogHeader>
        <BlogArticleEditor onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
