import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { BlogFilters } from "@/components/blog/BlogFilters";
import { NewsletterSignup } from "@/components/blog/NewsletterSignup";
import { roleBlogs, blogCategories, blogArticles } from "@/data/blogData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpDown } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { useBlogArticles } from "@/hooks/useBlogArticles";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BlogIndex = () => {
  useSEO('/blog');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'title' | 'date' | 'category'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const { articles: dbArticles, loading } = useBlogArticles({ 
    contentType: activeFilter
  });

  // Объединяем статьи из БД со статическими статьями
  const allArticles = useMemo(() => {
    console.log('dbArticles:', dbArticles.length, dbArticles);
    console.log('activeFilter:', activeFilter);
    
    // Объединяем статьи из БД и статические
    const staticArticles = activeFilter === 'all'
      ? blogArticles
      : blogArticles.filter(article => article.contentType === activeFilter);
    
    const combinedArticles = [...dbArticles, ...staticArticles];
    
    console.log('articles before sort:', combinedArticles.length, combinedArticles);
    
    // Применяем сортировку
    const sorted = [...combinedArticles].sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title, 'ru');
          break;
        case 'date':
          const dateA = 'created_at' in a ? new Date(a.created_at as string).getTime() : 0;
          const dateB = 'created_at' in b ? new Date(b.created_at as string).getTime() : 0;
          comparison = dateA - dateB;
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category, 'ru');
          break;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    console.log('sorted articles:', sorted.length, sorted);
    return sorted;
  }, [dbArticles, activeFilter, sortBy, sortDirection]);

  const displayedArticles = useMemo(() => {
    return allArticles;
  }, [allArticles]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Блог Invest-Ex
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Экспертные статьи, кейсы и аналитика от профессионалов венчурной индустрии
          </p>
        </section>

        {/* Role Blogs */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Блоги по ролям</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roleBlogs.map((roleBlog) => (
              <Link key={roleBlog.id} to={roleBlog.path}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {roleBlog.name}
                      <ArrowRight className="h-5 w-5 text-primary" />
                    </CardTitle>
                    <CardDescription>{roleBlog.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Категории по темам</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogCategories.map((category) => (
              <Link key={category.id} to={`/blog/categories/${category.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {category.articlesCount} статей
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Blog Articles with Filters and Sorting */}
        <section className="mb-16">
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h2 className="text-3xl font-bold">Статьи блога</h2>
              <BlogFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
            </div>
            
            {/* Sorting Controls */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Сортировать:</span>
                <Select value={sortBy} onValueChange={(value: 'title' | 'date' | 'category') => setSortBy(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">По дате</SelectItem>
                    <SelectItem value="title">По названию</SelectItem>
                    <SelectItem value="category">По теме</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="gap-2"
              >
                <ArrowUpDown className="h-4 w-4" />
                {sortDirection === 'asc' ? 'По возрастанию' : 'По убыванию'}
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="aspect-video w-full" />
                    <CardContent className="p-6">
                      <Skeleton className="h-4 w-20 mb-3" />
                      <Skeleton className="h-6 w-full mb-2" />
                      <Skeleton className="h-6 w-3/4 mb-4" />
                      <Skeleton className="h-16 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </>
            ) : (
              displayedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))
            )}
          </div>
        </section>

        {/* Newsletter */}
        <NewsletterSignup />
      </main>

      <Footer />
    </div>
  );
};

export default BlogIndex;
