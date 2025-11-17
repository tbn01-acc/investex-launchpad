import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { blogArticles } from "@/data/blogData";
import { useFavorites } from "@/hooks/useFavorites";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { OptimizedImage } from "@/components/OptimizedImage";

const BlogSection = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [displayCount, setDisplayCount] = useState(3);
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
      .slice(0, 8);
  }, []);

  // Фильтруем и выбираем статьи
  const filteredArticles = useMemo(() => {
    let filtered = blogArticles;
    
    // Filter by content type
    if (activeFilter !== 'all') {
      filtered = filtered.filter(article => article.contentType === activeFilter);
    }
    
    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(article =>
        selectedTags.some(tag => article.tags.includes(tag))
      );
    }
    
    return filtered;
  }, [activeFilter, selectedTags]);

  const displayedArticles = useMemo(() => {
    return filteredArticles.slice(0, displayCount);
  }, [filteredArticles, displayCount]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleShowMore = () => {
    setDisplayCount(prev => prev + itemsPerPage);
  };

  const hasMore = displayCount < filteredArticles.length;

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

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          <Button
            variant={activeFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('all')}
          >
            Все
          </Button>
          <Button
            variant={activeFilter === 'guides' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('guides')}
          >
            Гайды
          </Button>
          <Button
            variant={activeFilter === 'cases' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('cases')}
          >
            Кейсы
          </Button>
          <Button
            variant={activeFilter === 'analytics' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('analytics')}
          >
            Аналитика
          </Button>
          <Button
            variant={activeFilter === 'trends' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('trends')}
          >
            Тренды
          </Button>
        </div>

        {/* Items Per Page Selector */}
        <div className="flex justify-center gap-2 mb-6">
          <span className="text-sm text-muted-foreground self-center">Показывать по:</span>
          {[0, 3, 6, 9, 12, 15].map((count) => (
            <Button
              key={count}
              variant={itemsPerPage === count ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setItemsPerPage(count);
                setDisplayCount(count === 0 ? filteredArticles.length : count);
              }}
            >
              {count === 0 ? 'Все' : count}
            </Button>
          ))}
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
              <div className="relative">
                <OptimizedImage
                  src={article.image}
                  alt={article.title}
                  className="group-hover:scale-105 transition-transform duration-300"
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
                    {article.readTime} мин
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

        {/* Show More Button */}
        {hasMore && (
          <div className="text-center mt-8">
            <Button onClick={handleShowMore} variant="outline">
              Показать еще
            </Button>
          </div>
        )}

        {/* Кнопка "Все статьи" */}
        <div className="text-center mt-12">
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
