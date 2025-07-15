import { Button } from "@/components/ui/button";
import { useKKNPrograms } from "@/hooks/useKKNPrograms";
import { useCommunityPrograms } from "@/hooks/useCommunityPrograms";
import { useState } from "react";

const InfoSection = () => {
  const { data: kknPrograms = [], isLoading: isKKNLoading } = useKKNPrograms();
  const { data: communityPrograms = [], isLoading: isCommunityLoading } =
    useCommunityPrograms();

  // State management untuk PDF pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10); // Sesuaikan dengan jumlah halaman PDF sebenarnya
  const [isLoading, setIsLoading] = useState(false);
  const [showUMKMCatalog, setShowUMKMCatalog] = useState(false);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const closePDFViewer = () => {
    setShowUMKMCatalog(false);
    setCurrentPage(1);
  };

  const openUMKMCatalog = () => {
    setShowUMKMCatalog(true);
    setTotalPages(10); // Set total pages atau dapatkan dari PDF
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            Info Tambahan
          </h2>
        </div>

        {/* Community Programs */}
        <div>
          <h3 className="text-xl font-bold text-green-700 mb-8 text-center">
            Program Kemasyarakatan
          </h3>
          {isCommunityLoading ? (
            <div className="text-center text-gray-500">
              Memuat data program kemasyarakatan...
            </div>
          ) : communityPrograms.length === 0 ? (
            <div className="text-center text-gray-500">
              Belum ada data program kemasyarakatan.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {communityPrograms.map((program, index) => (
                <div
                  key={program.id || index}
                  className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mr-4">
                      <svg
                        className="w-7 h-7 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">
                        {program.title}
                      </h4>
                      {program.schedule && (
                        <p className="text-green-600 font-medium">
                          {program.schedule}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  {program.location && (
                    <div className="flex items-center text-sm text-gray-500">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {program.location}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* UMKM Section */}
        <div className="mt-16">
          <h3 className="text-xl font-bold text-orange-700 mb-8 text-center">
            UMKM Desa Ngasem
          </h3>
          <div className="text-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">
                Katalog UMKM Desa Ngasem
              </h4>
              <p className="text-gray-600 mb-6">
                Temukan berbagai produk dan layanan dari UMKM lokal desa kami.
                Katalog ini berisi informasi lengkap tentang produk, kontak, dan
                lokasi setiap UMKM.
              </p>
              <Button
                onClick={openUMKMCatalog}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white py-3 text-lg font-semibold"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                Buka Katalog UMKM
              </Button>
            </div>
          </div>
        </div>

        {/* KKN Section */}
        <div className="mt-16">
          <h3 className="text-xl font-bold text-blue-700 mb-8 text-center">
            Kegiatan KKN Mahasiswa
          </h3>
          {isKKNLoading ? (
            <div className="text-center text-gray-500">Memuat data KKN...</div>
          ) : kknPrograms.length === 0 ? (
            <div className="text-center text-gray-500">Belum ada data KKN.</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {kknPrograms.map((program, index) => (
                <div
                  key={program.id || index}
                  className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-800">
                        {program.title}
                      </h4>
                      <p className="text-blue-600 font-medium">
                        {program.period}
                      </p>
                    </div>
                  </div>
                  {program.participants && (
                    <p className="text-gray-600 mb-2">
                      <span className="font-semibold">Peserta:</span>{" "}
                      {program.participants} Mahasiswa
                    </p>
                  )}
                  {program.activities && Array.isArray(program.activities) && (
                    <div className="mb-6">
                      <h5 className="font-semibold text-gray-800 mb-2">
                        Kegiatan:
                      </h5>
                      <ul className="text-gray-600 space-y-1">
                        {program.activities.map(
                          (activity: string, idx: number) => (
                            <li key={idx}>• {activity}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                  {program.description && (
                    <p className="text-gray-600 mb-2">{program.description}</p>
                  )}
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
                    Lihat Detail Program
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {showUMKMCatalog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white p-4 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">Katalog UMKM Desa Ngasem</h3>
                <p className="text-orange-100 text-sm">
                  Produk dan Layanan UMKM Lokal
                </p>
              </div>
              <button
                onClick={closePDFViewer}
                className="text-white hover:text-orange-200 transition-colors p-2 hover:bg-orange-800 rounded-full"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* PDF Content - Per Page Display */}
            <div className="bg-gray-100 h-[calc(95vh-140px)] p-4">
              <div className="bg-white rounded-lg h-full shadow-inner overflow-hidden relative">
                {/* PDF Viewer - Single Page Display */}
                <iframe
                  src={`/UMKMKATALOG.pdf#page=${currentPage}&view=Fit&zoom=page-fit&toolbar=0&navpanes=0&scrollbar=0`}
                  title={`Katalog UMKM Desa Ngasem - Halaman ${currentPage}`}
                  className="w-full h-full border-0 rounded-lg"
                  style={{
                    minHeight: "500px",
                    border: "none",
                    outline: "none",
                    overflow: "hidden",
                  }}
                />

                {/* Page Overlay for Custom Control */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Page number indicator */}
                  <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                    {currentPage} / {totalPages}
                  </div>

                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center">
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                        <span className="text-gray-600">Memuat halaman...</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="bg-gray-50 p-4 flex justify-between items-center border-t">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Sebelumnya
              </button>

              <div className="flex items-center space-x-4">
                <span className="text-gray-600 text-sm font-medium">
                  Halaman {currentPage} dari {totalPages}
                </span>

                {/* Page Jump Controls */}
                <div className="flex space-x-1">
                  {/* First page */}
                  {currentPage > 3 && (
                    <>
                      <button
                        onClick={() => setCurrentPage(1)}
                        className="w-8 h-8 rounded-full text-sm font-medium transition-colors bg-gray-200 text-gray-600 hover:bg-gray-300"
                      >
                        1
                      </button>
                      {currentPage > 4 && (
                        <span className="text-gray-400">...</span>
                      )}
                    </>
                  )}

                  {/* Current page range */}
                  {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                    const pageNum = Math.max(1, currentPage - 2) + i;
                    if (pageNum <= totalPages && pageNum <= currentPage + 2) {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                            currentPage === pageNum
                              ? "bg-orange-600 text-white"
                              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                    return null;
                  })}

                  {/* Last page */}
                  {currentPage < totalPages - 2 && (
                    <>
                      {currentPage < totalPages - 3 && (
                        <span className="text-gray-400">...</span>
                      )}
                      <button
                        onClick={() => setCurrentPage(totalPages)}
                        className="w-8 h-8 rounded-full text-sm font-medium transition-colors bg-gray-200 text-gray-600 hover:bg-gray-300"
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>

                {/* Direct page input */}
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500 text-sm">Ke:</span>
                  <input
                    type="number"
                    min="1"
                    max={totalPages}
                    value={currentPage}
                    onChange={(e) => {
                      const page = parseInt(e.target.value);
                      if (page >= 1 && page <= totalPages) {
                        setCurrentPage(page);
                      }
                    }}
                    className="w-16 px-2 py-1 border border-gray-300 rounded text-sm text-center focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Selanjutnya
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default InfoSection;
