import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { blogArticles, blogAuthors } from "@/data/blogData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSEO } from "@/hooks/useSEO";

const AuthorProfile = () => {
  const { authorId } = useParams<{ authorId: string }>();
  
  useSEO(`/blog/authors/${authorId}`);

  const author = blogAuthors.find(a => a.id === authorId);
  const authorArticles = blogArticles.filter(article => article.author.id === authorId);

  if (!author) {
    return <div>Автор не найден</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        {/* Author Profile */}
        <section className="text-center mb-16">
          <Avatar className="h-32 w-32 mx-auto mb-6">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback className="text-4xl">{author.name[0]}</AvatarFallback>
          </Avatar>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            {author.name}
          </h1>
          <p className="text-xl text-primary mb-4">{author.role}</p>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            {author.bio}
          </p>
          <p className="text-muted-foreground">
            {author.articlesCount} опубликованных статей
          </p>
        </section>

        {/* Author Articles */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Статьи автора</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {authorArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          {authorArticles.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              У этого автора пока нет опубликованных статей
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AuthorProfile;
