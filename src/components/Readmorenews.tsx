import { useParams, useNavigate } from "react-router-dom";
import { useNews } from "@/hooks/useNews";
import { Calendar, Tag, ArrowLeft, TrendingUp, Clock, User, Eye, Share2 } from "lucide-react";
import { useState, useEffect } from "react";

const ReadMoreNewsDetail = () => {
  const { id } = useParams();
  const { data: news = [], isLoading } = useNews();
  const navigate = useNavigate();
  const [readingTime, setReadingTime] = useState(0);

  const article = news.find((item) => item.id.toString() === id);

  // Calculate reading time
  useEffect(() => {
    if (article?.content) {
      const wordsPerMinute = 200;
      const wordCount = article.content.split(' ').length;
      const time = Math.ceil(wordCount / wordsPerMinute);
      setReadingTime(time);
    }
  }, [article]);

  const handleGoBack = () => {
    // Enhanced back navigation with fallback
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/news'); // Fallback route - adjust to your news list route
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.title,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      // Fallback to clipboard for unsupported browsers
      navigator.clipboard.writeText(window.location.href);
      alert('Link berhasil disalin ke clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <div className="h-64 bg-gray-200 rounded-xl"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="flex gap-4">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="text-center py-20">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <Tag className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Berita tidak ditemukan</h2>
          <p className="text-gray-500 mb-6">
            Artikel dengan ID "{id}" tidak dapat ditemukan atau mungkin telah dihapus.
          </p>
          <button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleGoBack}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium group transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          Kembali
        </button>
        
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <Share2 className="w-4 h-4" />
          Bagikan
        </button>
      </div>

      {/* Featured Image */}
      {article.image_url && (
        <div className="relative">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-72 md:h-96 object-cover rounded-2xl shadow-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
        </div>
      )}

      {/* Article Content */}
      <article className="space-y-6">
        {/* Title */}
        <header className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {article.title}
          </h1>
          
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
              <Calendar className="w-4 h-4" />
              {new Date(article.created_at).toLocaleDateString("id-ID", {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            
            <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              <Tag className="w-4 h-4" />
              {article.category}
            </span>
            
            {article.priority && (
              <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                <TrendingUp className="w-4 h-4" />
                {article.priority}
              </span>
            )}
            
            {readingTime > 0 && (
              <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full">
                <Clock className="w-4 h-4" />
                {readingTime} menit baca
              </span>
            )}
          </div>
        </header>

        {/* Article Body */}
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-800 leading-relaxed text-lg whitespace-pre-line">
            {article.content}
          </div>
        </div>
      </article>

      {/* Back to Top Button */}
      <div className="text-center pt-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          Kembali ke atas
        </button>
      </div>
    </div>
  );
};

export default ReadMoreNewsDetail;