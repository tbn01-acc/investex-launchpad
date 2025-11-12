-- Create subscriptions table
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tier TEXT NOT NULL CHECK (tier IN ('free', 'basic', 'professional', 'enterprise')),
  is_active BOOLEAN NOT NULL DEFAULT false,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for subscriptions
CREATE POLICY "Users can view their own subscription"
  ON public.subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subscription"
  ON public.subscriptions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscription"
  ON public.subscriptions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create blog_articles table
CREATE TABLE public.blog_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  full_content TEXT NOT NULL,
  category TEXT NOT NULL,
  role_type TEXT NOT NULL,
  content_type TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  is_premium BOOLEAN NOT NULL DEFAULT true,
  is_public BOOLEAN NOT NULL DEFAULT false,
  moderation_status TEXT NOT NULL DEFAULT 'pending' CHECK (moderation_status IN ('pending', 'approved', 'rejected')),
  moderated_by UUID REFERENCES auth.users(id),
  moderated_at TIMESTAMP WITH TIME ZONE,
  moderation_comment TEXT,
  read_time INTEGER NOT NULL DEFAULT 5,
  views_count INTEGER NOT NULL DEFAULT 0,
  likes_count INTEGER NOT NULL DEFAULT 0,
  dislikes_count INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blog_articles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for blog_articles
CREATE POLICY "Anyone can view approved public articles"
  ON public.blog_articles FOR SELECT
  TO public
  USING (moderation_status = 'approved' AND (is_public = true OR is_premium = false));

CREATE POLICY "Premium users can view approved premium articles"
  ON public.blog_articles FOR SELECT
  TO authenticated
  USING (
    moderation_status = 'approved' AND 
    (is_public = true OR 
     EXISTS (
       SELECT 1 FROM public.subscriptions 
       WHERE user_id = auth.uid() 
       AND is_active = true 
       AND tier IN ('basic', 'professional', 'enterprise')
     ))
  );

CREATE POLICY "Authors can view their own articles"
  ON public.blog_articles FOR SELECT
  TO authenticated
  USING (auth.uid() = author_id);

CREATE POLICY "Users can create articles"
  ON public.blog_articles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their own pending articles"
  ON public.blog_articles FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id AND moderation_status = 'pending');

-- Create blog_article_ratings table
CREATE TABLE public.blog_article_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID NOT NULL REFERENCES public.blog_articles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating IN (1, -1)),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(article_id, user_id)
);

-- Enable RLS
ALTER TABLE public.blog_article_ratings ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view all ratings"
  ON public.blog_article_ratings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own ratings"
  ON public.blog_article_ratings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ratings"
  ON public.blog_article_ratings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ratings"
  ON public.blog_article_ratings FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create blog_category_subscriptions table
CREATE TABLE public.blog_category_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, category)
);

-- Enable RLS
ALTER TABLE public.blog_category_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can manage their own category subscriptions"
  ON public.blog_category_subscriptions FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create blog_author_subscriptions table
CREATE TABLE public.blog_author_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscriber_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(subscriber_id, author_id)
);

-- Enable RLS
ALTER TABLE public.blog_author_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can manage their own author subscriptions"
  ON public.blog_author_subscriptions FOR ALL
  TO authenticated
  USING (auth.uid() = subscriber_id)
  WITH CHECK (auth.uid() = subscriber_id);

-- Create indexes for performance
CREATE INDEX idx_blog_articles_author ON public.blog_articles(author_id);
CREATE INDEX idx_blog_articles_status ON public.blog_articles(moderation_status);
CREATE INDEX idx_blog_articles_category ON public.blog_articles(category);
CREATE INDEX idx_blog_articles_role_type ON public.blog_articles(role_type);
CREATE INDEX idx_blog_articles_published ON public.blog_articles(published_at DESC);
CREATE INDEX idx_blog_article_ratings_article ON public.blog_article_ratings(article_id);
CREATE INDEX idx_blog_article_ratings_user ON public.blog_article_ratings(user_id);

-- Function to update article rating counts
CREATE OR REPLACE FUNCTION update_article_rating_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.rating = 1 THEN
      UPDATE public.blog_articles SET likes_count = likes_count + 1 WHERE id = NEW.article_id;
    ELSE
      UPDATE public.blog_articles SET dislikes_count = dislikes_count + 1 WHERE id = NEW.article_id;
    END IF;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.rating = 1 AND NEW.rating = -1 THEN
      UPDATE public.blog_articles SET likes_count = likes_count - 1, dislikes_count = dislikes_count + 1 WHERE id = NEW.article_id;
    ELSIF OLD.rating = -1 AND NEW.rating = 1 THEN
      UPDATE public.blog_articles SET dislikes_count = dislikes_count - 1, likes_count = likes_count + 1 WHERE id = NEW.article_id;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.rating = 1 THEN
      UPDATE public.blog_articles SET likes_count = likes_count - 1 WHERE id = OLD.article_id;
    ELSE
      UPDATE public.blog_articles SET dislikes_count = dislikes_count - 1 WHERE id = OLD.article_id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update rating counts
CREATE TRIGGER trigger_update_article_rating_counts
  AFTER INSERT OR UPDATE OR DELETE ON public.blog_article_ratings
  FOR EACH ROW
  EXECUTE FUNCTION update_article_rating_counts();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_blog_articles_updated_at
  BEFORE UPDATE ON public.blog_articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_article_ratings_updated_at
  BEFORE UPDATE ON public.blog_article_ratings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();