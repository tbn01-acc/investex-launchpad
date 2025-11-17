import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { BlogFilters } from "@/components/blog/BlogFilters";
import { NewsletterSignup } from "@/components/blog/NewsletterSignup";
import { roleBlogs, blogCategories } from "@/data/blogData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { useBlogArticles } from "@/hooks/useBlogArticles";
import { Skeleton } from "@/components/ui/skeleton";

const BlogIndex = () => {
  useSEO('/blog');
  const [activeFilter, setActiveFilter] = useState('all');
  const { articles, loading } = useBlogArticles({ 
    contentType: activeFilter, 
    limit: 6 
  });

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

        {/* Recent Articles with Filters */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h2 className="text-3xl font-bold">Последние статьи</h2>
            <BlogFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
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
              articles.map((article) => (
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
