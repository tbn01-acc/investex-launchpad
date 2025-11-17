-- First, ensure user_id is unique and can be referenced
-- Drop the id column as primary key if it exists and make user_id the primary key
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_pkey;
ALTER TABLE public.profiles ADD PRIMARY KEY (user_id);

-- Now add the foreign key relationship from blog_articles to profiles
ALTER TABLE public.blog_articles DROP CONSTRAINT IF EXISTS blog_articles_author_id_fkey;
ALTER TABLE public.blog_articles 
ADD CONSTRAINT blog_articles_author_id_fkey 
FOREIGN KEY (author_id) 
REFERENCES public.profiles(user_id) 
ON DELETE CASCADE;