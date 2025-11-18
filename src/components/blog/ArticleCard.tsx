import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock } from "lucide-react";
import { BlogArticle } from "@/data/blogData";
import { BlogArticleFromDB } from "@/hooks/useBlogArticles";
import { OptimizedImage } from "@/components/OptimizedImage";

interface ArticleCardProps {
  article: BlogArticle | BlogArticleFromDB;
}

const isDBArticle = (article: BlogArticle | BlogArticleFromDB): article is BlogArticleFromDB => {
  return 'author' in article && typeof article.author === 'object' && article.author !== null && 'user_id' in article.author;
};

export const ArticleCard = ({ article }: ArticleCardProps) => {
  const isDB = isDBArticle(article);
  
  const imageUrl = isDB 
    ? (article.image_url || '/placeholder.svg')
    : article.image;
  
  const authorName = isDB 
    ? `${article.author?.first_name || ''} ${article.author?.last_name || ''}`.trim() || 'Аноним'
    : article.author?.name || 'Аноним';
  
  const authorAvatar = isDB 
    ? (article.author?.avatar_url || '')
    : (article.author?.avatar || '');
  
  const authorRole = isDB 
    ? (article.author?.role || '')
    : (article.author?.role || '');
  
  const category = isDB ? article.category : article.category;
  const contentType = isDB ? article.content_type : article.contentType;
  const readTime = isDB ? article.read_time : article.readTime;

  return (
    <Link to={`/blog/article/${article.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
        <OptimizedImage
          src={imageUrl}
          alt={article.title}
          className="hover:scale-105 transition-transform duration-300"
        />
        <CardHeader>
          <div className="flex gap-2 mb-2">
            <Badge variant="secondary">{category}</Badge>
            <Badge variant="outline">{contentType}</Badge>
          </div>
          <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
            {article.title}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {article.excerpt}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={authorAvatar} alt={authorName} />
                <AvatarFallback>{authorName[0] || 'A'}</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">{authorName}</p>
                <p className="text-muted-foreground text-xs">{authorRole}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Clock className="h-4 w-4" />
              <span>{readTime} мин</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
