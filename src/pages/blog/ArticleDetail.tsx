import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { blogArticles } from "@/data/blogData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ArrowLeft } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const ArticleDetail = () => {
  const { articleId } = useParams<{ articleId: string }>();
  
  const article = blogArticles.find(a => a.id === articleId);

  useSEO(`/blog/article/${articleId}`, article ? {
    title: `${article.title} | Invest-Ex`,
    description: article.excerpt,
    ogImage: article.image
  } : undefined);

  if (!article) {
    return <div>Статья не найдена</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <Link to="/blog">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад к блогу
          </Button>
        </Link>

        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <div className="flex gap-2 mb-4">
              <Badge variant="secondary">{article.category}</Badge>
              <Badge variant="outline">{article.contentType}</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {article.title}
            </h1>
            
            {/* Author Info */}
            <div className="flex items-center justify-between flex-wrap gap-4 pb-8 border-b">
              <Link to={`/blog/authors/${article.author.id}`}>
                <div className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={article.author.avatar} alt={article.author.name} />
                    <AvatarFallback>{article.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{article.author.name}</p>
                    <p className="text-sm text-muted-foreground">{article.author.role}</p>
                  </div>
                </div>
              </Link>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{article.readTime} мин чтения</span>
                </div>
                <span className="text-sm">{article.publishedAt}</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="aspect-video overflow-hidden rounded-lg mb-8">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="lead text-xl text-muted-foreground mb-8">
              {article.excerpt}
            </p>
            <div className="whitespace-pre-line">
              {article.content}
            </div>
          </div>

          {/* Tags */}
          <div className="flex gap-2 flex-wrap pt-8 border-t">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default ArticleDetail;
