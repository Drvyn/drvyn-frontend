import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import SocialShareButtons from '@/components/SocialShareButtons';
import Footer from '@/components/Footer';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  authorRole: string;
  image: string;
  readTime: string;
  excerpt: string;
  slug: string;
}

// Fetch individual blog post
async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const response = await fetch(`${apiUrl}/api/blog/${slug}`, {
      next: { revalidate: 60 }
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch blog post');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

// Generate SEO Metadata dynamically
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }
  
  return {
    title: `${post.title} | Drvyn Blog`,
    description: post.excerpt || post.content.substring(0, 160) + '...',
    openGraph: {
      title: post.title,
      description: post.excerpt || post.content.substring(0, 160) + '...',
      url: `https://drvyn.in/blog/${slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.image,
          width: 800,
          height: 600,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // --- STRUCTURED DATA FOR SEO (Schema.org) ---
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://drvyn.in/blog/${slug}`
    },
    "headline": post.title,
    "image": [post.image],
    "datePublished": post.date,
    "dateModified": post.date, 
    "author": {
      "@type": "Person",
      "name": post.author || "Drvyn Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Drvyn",
      "logo": {
        "@type": "ImageObject",
        "url": "https://drvyn.in/favicon2.png"
      }
    },
    "description": post.excerpt
  };

  return (
    <>
      {/* Inject Schema into the page head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Navbar/>
      <article className="min-h-screen bg-white">
        <div className="container mx-auto px-4 max-w-4xl py-8">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="group inline-flex items-center text-blue-600 hover:text-blue-800 transition-all duration-300 bg-blue-50 hover:bg-blue-100 px-4 py-3 rounded-lg"
            >
              <svg
                className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </div>
          
          {/* Portrait Image Section */}
          <div className="flex justify-center mb-10">
            <div className="relative h-96 w-full max-w-md rounded-2xl overflow-hidden group shadow-lg">
              <Image
                src={post.image || '/api/placeholder/400/500'}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
          
          {/* Article Header */}
          <header className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span>📖</span>
              <span>{post.readTime}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-600 mb-6">
              <div className="flex items-center gap-3">
                <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</time>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold overflow-hidden">
                    <Image
                      src="/favicon3.png"
                      alt={post.author}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">{post.author}</p>
                    <p className="text-sm text-gray-500">{post.authorRole}</p>
                  </div>
                </div>
              </div>
            </div>
          </header>
          
          {/* Article Content */}
          <div className="prose prose-lg max-w-none
            prose-headings:text-gray-900 prose-headings:font-bold
            prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-lg
            prose-strong:text-gray-900 prose-strong:font-semibold
            prose-li:text-gray-700 prose-li:marker:text-blue-500
            prose-a:text-blue-600 prose-a:no-underline prose-a:border-b-2 prose-a:border-blue-200 prose-a:hover:border-blue-600
            prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r
            prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:text-gray-800
            prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800
            prose-img:rounded-xl prose-img:shadow-md prose-img:mx-auto
            prose-table:border prose-table:border-gray-300
            prose-th:bg-gray-100 prose-th:text-gray-900
            prose-td:border prose-td:border-gray-300
            mb-16">
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
          
          {/* Share Section */}
          <div className="border-t border-gray-200 pt-8 mb-16">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Enjoyed this article?</h3>
                <p className="text-gray-600">Share it with your network</p>
              </div>
              <SocialShareButtons
                title={post.title}
              />
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 mb-16">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Join the Conversation</h2>
                <p className="text-gray-600">Share your thoughts and insights about this article</p>
              </div>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-3">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full p-4 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-3">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full p-4 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-3">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full p-4 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical"
                    placeholder="What are your thoughts on this article?"
                    required
                  />
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Your information is secure and will not be shared</span>
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-3 font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    Post Comment
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Related Articles */}
          <div className="text-center border-t border-gray-200 pt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Explore More Articles</h3>
            <p className="text-gray-600 mb-6">Discover other insightful content from our blog</p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-lg text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              View All Articles
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </article>
      <Footer/>
    </>
  );
}