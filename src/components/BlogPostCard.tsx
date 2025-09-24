import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  image: string;
  readTime: string;
}

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="bg-card rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-48 w-full">
          <Image
            src={post.image || '/api/placeholder/400/250'}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <p className="text-sm text-muted-foreground mb-2">
            {post.date} • {post.readTime}
          </p>
          <h2 className="text-xl font-semibold text-foreground mb-3 hover:text-primary transition-colors">
            {post.title}
          </h2>
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex items-center text-primary font-medium">
            Read More
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </article>
  );
}