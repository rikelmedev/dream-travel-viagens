import Blog from '@/components/Blog';

/**
 * BlogPage
 * Página de blog com posts
 */

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12 px-4">
        <div className="container">
          <h1 className="text-4xl font-bold text-foreground mb-2 font-serif">
            Blog Dream Travel
          </h1>
          <p className="text-lg text-muted-foreground">
            Dicas, histórias e inspiração para suas viagens
          </p>
        </div>
      </section>

      {/* Blog Component */}
      <section className="py-12 px-4">
        <Blog />
      </section>
    </div>
  );
}
