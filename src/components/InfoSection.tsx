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
  const [totalPages, setTotalPages] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [showUMKMCatalog, setShowUMKMCatalog] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState({});

  const nextPhoto = (programId, totalPhotos) => {
    setCurrentPhotoIndex((prev) => ({
      ...prev,
      [programId]: ((prev[programId] || 0) + 1) % totalPhotos,
    }));
  };

  const prevPhoto = (programId, totalPhotos) => {
    setCurrentPhotoIndex((prev) => ({
      ...prev,
      [programId]: ((prev[programId] || 0) - 1 + totalPhotos) % totalPhotos,
    }));
  };

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
    setTotalPages(10);
  };

  return (
    <section className="relative py-24 px-4 bg-gradient-to-br from-slate-50 via-blue-50/20 to-green-50/30 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-orange-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header dengan animasi */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl mb-6 shadow-lg">
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
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
            Info Tambahan
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Temukan berbagai informasi program kemasyarakatan, UMKM lokal, dan
            kegiatan KKN mahasiswa di desa kami
          </p>
        </div>

        {/* Community Programs */}
        <div className="mb-24">
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
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
              <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Program Kemasyarakatan
              </h3>
            </div>
          </div>

          {isCommunityLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <span className="text-gray-600 text-lg">
                  Memuat data program kemasyarakatan...
                </span>
              </div>
            </div>
          ) : communityPrograms.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">
                Belum ada data program kemasyarakatan.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {communityPrograms.map((program, index) => (
                <div
                  key={program.id || index}
                  className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/20"
                >
                  <div className="flex items-center mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
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
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                        {program.title}
                      </h4>
                      {program.schedule && (
                        <p className="text-green-600 font-semibold text-sm bg-green-50 px-3 py-1 rounded-full inline-block mt-1">
                          {program.schedule}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {program.description}
                  </p>
                  {program.location && (
                    <div className="flex items-center text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-xl">
                      <svg
                        className="w-4 h-4 mr-2 text-green-500"
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
        <div className="mb-24">
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
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
              <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                UMKM Desa Ngasem
              </h3>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 max-w-lg hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border border-white/20">
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-300 group-hover:scale-105">
                    <svg
                      className="w-12 h-12 text-white"
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
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></div>
                </div>
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Katalog UMKM Desa Ngasem
              </h4>
              <p className="text-gray-600 mb-8 leading-relaxed text-center">
                Temukan berbagai produk dan layanan dari UMKM lokal desa kami.
                Katalog ini berisi informasi lengkap tentang produk, kontak, dan
                lokasi setiap UMKM.
              </p>
              <Button
                onClick={openUMKMCatalog}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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
        <div>
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
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
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Kegiatan KKN FMIPA UB 2025
              </h3>
            </div>
          </div>

          {isKKNLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="text-gray-600 text-lg">
                  Memuat data KKN...
                </span>
              </div>
            </div>
          ) : kknPrograms.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-12 h-12 text-gray-400"
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
              <p className="text-gray-500 text-lg">Belum ada data KKN.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {kknPrograms.map((program, index) => {
                const programId = program.id || index;
                const currentIndex = currentPhotoIndex[programId] || 0;
                const totalPhotos = program.photos?.length || 0;

                return (
                  <div
                    key={programId}
                    className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/20"
                  >
                    {/* Photo Slider Section */}
                    {program.photos && program.photos.length > 0 ? (
                      <div className="relative h-64 overflow-hidden">
                        <div
                          className="flex transition-transform duration-500 ease-out h-full"
                          style={{
                            transform: `translateX(-${currentIndex * 100}%)`,
                          }}
                        >
                          {program.photos.map((photo, photoIndex) => (
                            <div
                              key={photoIndex}
                              className="w-full flex-shrink-0 relative"
                            >
                              <img
                                src={photo}
                                alt={`${program.nama_proker} - Foto ${
                                  photoIndex + 1
                                }`}
                                className="w-full h-64 object-cover"
                                onError={(e) => {
                                  e.currentTarget.src =
                                    "/placeholder-image.jpg";
                                }}
                              />

                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                            </div>
                          ))}
                        </div>

                        {/* Navigation Arrows */}
                        {totalPhotos > 1 && (
                          <>
                            <button
                              onClick={() => prevPhoto(programId, totalPhotos)}
                              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-gray-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
                            >
                              <svg
                                className="w-5 h-5"
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
                            </button>
                            <button
                              onClick={() => nextPhoto(programId, totalPhotos)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-gray-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
                            >
                              <svg
                                className="w-5 h-5"
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

                            {/* Photo Indicators */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                              {program.photos.map((_, photoIndex) => (
                                <button
                                  key={photoIndex}
                                  onClick={() =>
                                    setCurrentPhotoIndex((prev) => ({
                                      ...prev,
                                      [programId]: photoIndex,
                                    }))
                                  }
                                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    photoIndex === currentIndex
                                      ? "bg-white w-6"
                                      : "bg-white/60 hover:bg-white/80"
                                  }`}
                                />
                              ))}
                            </div>

                            {/* Photo Counter */}
                            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                              {currentIndex + 1} / {totalPhotos}
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      // Placeholder jika tidak ada foto
                      <div className="h-64 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                        <div className="text-center">
                          <svg
                            className="w-16 h-16 text-blue-300 mx-auto mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="text-blue-400 text-sm">
                            Foto belum tersedia
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Content Section */}
                    <div className="p-8">
                      {/* Nama Proker */}
                      <h4 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 mb-4">
                        {program.nama_proker}
                      </h4>

                      {/* Info Cards */}
                      <div className="space-y-3 mb-6">
                        {/* Tanggal */}
                        {program.tanggal && (
                          <div className="flex items-center text-gray-600 bg-blue-50 px-4 py-3 rounded-xl">
                            <svg
                              className="w-5 h-5 mr-3 text-blue-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            <span className="font-semibold">Tanggal:</span>
                            <span className="ml-2 text-blue-600 font-medium">
                              {program.tanggal}
                            </span>
                          </div>
                        )}

                        {/* Lokasi */}
                        {program.lokasi && (
                          <div className="flex items-center text-gray-600 bg-green-50 px-4 py-3 rounded-xl">
                            <svg
                              className="w-5 h-5 mr-3 text-green-500"
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
                            <span className="font-semibold">Lokasi:</span>
                            <span className="ml-2 text-green-600 font-medium">
                              {program.lokasi}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Deskripsi */}
                      {program.deskripsi && (
                        <div className="mb-6">
                          <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                            <svg
                              className="w-5 h-5 mr-2 text-blue-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                            Deskripsi Kegiatan:
                          </h5>
                          {Array.isArray(program.deskripsi) ? (
                            <ul className="text-gray-600 space-y-2">
                              {program.deskripsi.map((desc, idx) => (
                                <li key={idx} className="flex items-start">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                  <span className="leading-relaxed">
                                    {desc}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-600 leading-relaxed text-justify indent-6">
                              {program.deskripsi}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Enhanced PDF Viewer Modal */}
      {showUMKMCatalog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden animate-in zoom-in duration-300">
            {/* Enhanced Header */}
            <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10 flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-1">
                    Katalog UMKM Desa Ngasem
                  </h3>
                  <p className="text-orange-100 text-sm">
                    Produk dan Layanan UMKM Lokal
                  </p>
                </div>
                <button
                  onClick={closePDFViewer}
                  className="text-white hover:text-orange-200 transition-colors p-3 hover:bg-white/20 rounded-full backdrop-blur-sm"
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
            </div>

            {/* PDF Content */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 h-[calc(95vh-160px)] p-6">
              <div className="bg-white rounded-2xl h-full shadow-inner overflow-hidden relative">
                <iframe
                  src={`/UMKMKATALOG.pdf#page=${currentPage}&view=Fit&zoom=page-fit&toolbar=0&navpanes=0&scrollbar=0`}
                  title={`Katalog UMKM Desa Ngasem - Halaman ${currentPage}`}
                  className="w-full h-full border-0 rounded-2xl"
                  style={{
                    minHeight: "500px",
                    border: "none",
                    outline: "none",
                    overflow: "hidden",
                  }}
                />

                {/* Enhanced overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-6 right-6 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                    {currentPage} / {totalPages}
                  </div>

                  {isLoading && (
                    <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center">
                      <div className="flex items-center space-x-3">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                        <span className="text-gray-600 font-medium">
                          Memuat halaman...
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default InfoSection;
