import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { blogArticles } from "@/data/blogData";
import { useFavorites } from "@/hooks/useFavorites";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const BlogSection = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { isFavorite, toggleFavorite } = useFavorites('article');

  // Собираем все теги и считаем количество статей
  const tagStats = useMemo(() => {
    const tagMap = new Map<string, number>();
    blogArticles.forEach(article => {
      article.tags.forEach(tag => {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
      });
    });
    return Array.from(tagMap.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8); // Показываем топ-8 тегов
  }, []);

  // Фильтруем и выбираем статьи
  const displayedArticles = useMemo(() => {
    let filtered = blogArticles;
    
    if (selectedTags.length > 0) {
      filtered = blogArticles.filter(article =>
        selectedTags.some(tag => article.tags.includes(tag))
      );
    }
    
    // Перемешиваем и берем 3 статьи
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, [selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Блог об инвестициях
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Экспертные статьи, гайды и кейсы от профессионалов венчурного рынка
          </p>
        </div>

        {/* Фильтры по тегам */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tagStats.map(({ tag, count }) => (
            <Button
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleTag(tag)}
              className="transition-all"
            >
              {tag} <span className="ml-1 opacity-70">({count})</span>
            </Button>
          ))}
        </div>

        {/* Карточки статей */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayedArticles.map((article) => (
            <Card key={article.id} className="group hover:shadow-lg transition-all overflow-hidden">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-3 right-3 z-10"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(article.id);
                  }}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      isFavorite(article.id) ? "fill-current text-red-500" : ""
                    }`}
                  />
                </Button>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary">{article.category}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {article.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>

                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={article.author.avatar} alt={article.author.name} />
                      <AvatarFallback>{article.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <div className="font-medium text-foreground">{article.author.name}</div>
                      <div className="text-xs text-muted-foreground">{article.author.role}</div>
                    </div>
                  </div>

                  <Link to={`/blog/article/${article.id}`}>
                    <Button size="sm" className="gap-2">
                      Читать <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Кнопка "Все статьи" */}
        <div className="text-center">
          <Link to="/blog">
            <Button size="lg" variant="outline" className="gap-2">
              Все статьи блога <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
