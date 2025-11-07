import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock } from "lucide-react";
import { BlogArticle } from "@/data/blogData";

interface ArticleCardProps {
  article: BlogArticle;
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <Link to={`/blog/article/${article.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
        <div className="aspect-video overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardHeader>
          <div className="flex gap-2 mb-2">
            <Badge variant="secondary">{article.category}</Badge>
            <Badge variant="outline">{article.contentType}</Badge>
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
                <AvatarImage src={article.author.avatar} alt={article.author.name} />
                <AvatarFallback>{article.author.name[0]}</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">{article.author.name}</p>
                <p className="text-muted-foreground text-xs">{article.author.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Clock className="h-4 w-4" />
              <span>{article.readTime} мин</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
