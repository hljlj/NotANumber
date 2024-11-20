import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface Post {
  slug: string;
  title: string;
  description: string;
  editedAt: string;
  category: string;
}

export async function getAllPosts(): Promise<Post[]> {
  const categories = fs.readdirSync(contentDirectory);
  const allPosts: Post[] = [];

  for (const category of categories) {
    const categoryPath = path.join(contentDirectory, category);
    if (fs.statSync(categoryPath).isDirectory()) {
      const files = fs.readdirSync(categoryPath);
      
      for (const file of files) {
        if (file.endsWith('.mdx') || file.endsWith('.md')) {
          const fullPath = path.join(categoryPath, file);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data } = matter(fileContents);
          
          allPosts.push({
            slug: category,
            title: data.title,
            description: data.description,
            editedAt: data.editedAt,
            category: data.category || 'Article',
          });
        }
      }
    }
  }

  return allPosts.sort((a, b) => 
    new Date(b.editedAt).getTime() - new Date(a.editedAt).getTime()
  );
}

export function getPostsByCategory(posts: Post[]): { category: string; items: { post: Post }[] }[] {
  const categories = Array.from(new Set(posts.map(post => post.category)));
  
  return categories.map(category => ({
    category,
    items: posts
      .filter(post => post.category === category)
      .map(post => ({ post }))
  }));
}
