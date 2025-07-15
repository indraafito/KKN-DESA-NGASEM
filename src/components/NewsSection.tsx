import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNews } from "@/hooks/useNews";
import { ChevronUp, ChevronDown } from "lucide-react";

const NewsSection = () => {
  const { data: news = [], isLoading } = useNews();
  const [showAnnouncements, setShowAnnouncements] = useState(true);

  const announcements = [
    {
      title: "Pengumuman Seleksi Perangkat Desa",
      date: "2024-01-20",
      content:
        "Pendaftaran seleksi calon perangkat desa dibuka mulai 25 Januari 2024. Info lengkap di kantor desa.",
      urgent: true,
    },
    {
      title: "Jadwal Pelayanan Libur Nasional",
      date: "2024-01-18",
      content:
        "Pelayanan administrasi desa akan tutup pada tanggal 17 Agustus 2024 dalam rangka HUT RI ke-79.",
      urgent: false,
    },
    {
      title: "Pembayaran PBB 2024",
      date: "2024-01-15",
      content:
        "Batas waktu pembayaran PBB tahun 2024 diperpanjang hingga 31 Januari 2024.",
      urgent: true,
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-green-100 text-green-800 border-green-200";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <p>Loading berita...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            Berita & Update
          </h2>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news
            .filter((article) => article.status === "published")
            .map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col"
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                        article.priority || "medium"
                      )}`}
                    >
                      {article.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDate(article.created_at)}
                    </span>
                  </div>

                  <div className="text-center mb-4">
                    <div className="text-4xl mb-3">📰</div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="mt-auto pt-2">
                    <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white">
                      Baca Selengkapnya
                    </Button>
                  </div>
                </div>
              </article>

            ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="px-8 py-3 border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
          >
            Muat Berita Lainnya
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
