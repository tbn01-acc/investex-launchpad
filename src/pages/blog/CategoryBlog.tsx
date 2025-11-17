import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { BlogFilters } from "@/components/blog/BlogFilters";
import { NewsletterSignup } from "@/components/blog/NewsletterSignup";
import { blogCategories, blogArticles } from "@/data/blogData";
import { useSEO } from "@/hooks/useSEO";
import { useBlogArticles } from "@/hooks/useBlogArticles";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CategoryBlog = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [activeFilter, setActiveFilter] = useState('all');
  
  useSEO(`/blog/categories/${categoryId}`);

  const category = blogCategories.find(c => c.id === categoryId);
  
  const { articles: dbArticles, loading } = useBlogArticles({ 
    category: categoryId, 
    contentType: activeFilter 
  });

  // Используем статические данные если база пустая
  const articles = useMemo(() => {
    if (dbArticles.length > 0) return dbArticles;
    
    const categoryArticles = blogArticles.filter(article => article.category === categoryId);
    const staticArticles = activeFilter === 'all'
      ? categoryArticles
      : categoryArticles.filter(article => article.contentType === activeFilter);
    
    return staticArticles;
  }, [dbArticles, categoryId, activeFilter]);

  if (!category) {
    return <div>Категория не найдена</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {category.name}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {category.description}
          </p>
          <p className="text-muted-foreground mt-4">
            {category.articlesCount} статей в категории
          </p>
        </section>

        {/* Content Filters */}
        <section className="mb-8">
          <BlogFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </section>

        {/* Articles Grid */}
        <section className="mb-16">
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
              articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))
            )}
          </div>
          {!loading && articles.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              Статей в этой категории пока нет
            </div>
          )}
        </section>

        {/* Newsletter */}
        <NewsletterSignup />
      </main>

      <Footer />
    </div>
  );
};

export default CategoryBlog;
