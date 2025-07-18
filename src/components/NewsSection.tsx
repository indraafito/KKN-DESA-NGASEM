import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNews } from "@/hooks/useNews";
import { ChevronUp, ChevronDown, Search, Calendar, Tag, ArrowRight, Clock, TrendingUp } from "lucide-react";

const NewsSection = () => {
  const { data: news = [], isLoading } = useNews();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showMore, setShowMore] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-gradient-to-r from-red-50 to-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gradient-to-r from-green-50 to-green-100 text-green-700 border-green-200";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const filteredNews = news
    .filter((article) => article.status === "published")
    .filter((article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((article) =>
      selectedCategory === "all" ? true : article.category === selectedCategory
    )
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, showMore ? 12 : 6);

  const allCategories = Array.from(new Set(news.map((n) => n.category)));

  if (isLoading) {
    return (
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded-lg w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-48 mx-auto mb-8"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="h-20 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            Terkini
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-blue-800 bg-clip-text text-transparent mb-4">
            Berita & Update
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dapatkan informasi terbaru dan terpercaya seputar berita terkini
          </p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mb-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-green-400 to-blue-500 rounded-full -translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full translate-x-16 translate-y-16"></div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">
              Temukan Berita yang Anda Cari
            </h3>
            
            <div className="flex flex-col lg:flex-row items-center gap-6">
              {/* Search Input */}
              <div className="relative w-full lg:flex-1 group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 group-hover:shadow-xl transition-all duration-300">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-green-500 transition-colors" />
                  <Input
                    type="text"
                    placeholder="Ketik untuk mencari berita..."
                    className="pl-12 pr-4 py-4 border-0 focus:ring-0 rounded-2xl bg-transparent text-gray-700 placeholder-gray-400 font-medium"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter */}
              <div className="relative w-full lg:w-80 group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 group-hover:shadow-xl transition-all duration-300">
                  <Tag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-blue-500 transition-colors" />
                  <select
                    className="w-full pl-12 pr-10 py-4 border-0 rounded-2xl bg-transparent text-gray-700 font-medium appearance-none cursor-pointer focus:outline-none focus:ring-0"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="all">🌟 Semua Kategori</option>
                    {allCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        📂 {cat}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none group-hover:text-blue-500 transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredNews.map((article, index) => (
            <article
              key={article.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col group ${
                index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="p-6 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                      article.priority || "medium"
                    )}`}
                  >
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {formatDate(article.created_at)}
                  </div>
                </div>

                {/* Icon */}
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto group-hover:scale-110 transition-transform duration-300">
                    📰
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
                  {article.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                  {article.excerpt}
                </p>

                {/* Footer */}
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      5 min read
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <TrendingUp className="w-3 h-3" />
                      Trending
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-xl group-hover:shadow-lg transition-all duration-300">
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        {news.length > 6 && (
          <div className="text-center">
            <Button
              onClick={() => setShowMore(!showMore)}
              variant="outline"
              className="px-8 py-3 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg"
            >
              {showMore ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-2" />
                  Tampilkan Lebih Sedikit
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-2" />
                  Muat Berita Lainnya
                </>
              )}
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Tidak ada berita ditemukan
            </h3>
            <p className="text-gray-600">
              Coba ubah kata kunci pencarian atau filter kategori
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;