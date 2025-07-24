import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useKKNPrograms } from "@/hooks/useKKNPrograms";
import { ArrowLeft, Share2, Calendar, MapPin } from 'lucide-react';

const KknDetail = () => {
  const { id } = useParams(); // ID dari URL
  const navigate = useNavigate();
  const { data: programs = [], isLoading } = useKKNPrograms();

  const selectedProgram = programs.find((program) => program.id === id);

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<{ [key: string]: number }>({});

  const nextPhoto = (programId: string, totalPhotos: number) => {
    setCurrentPhotoIndex(prev => ({
      ...prev,
      [programId]: ((prev[programId] ?? 0) + 1) % totalPhotos,
    }));
  };

  const prevPhoto = (programId: string, totalPhotos: number) => {
    setCurrentPhotoIndex(prev => ({
      ...prev,
      [programId]: (prev[programId] ?? 0) === 0 ? totalPhotos - 1 : (prev[programId] ?? 0) - 1,
    }));
  };

  const handleBack = () => navigate(-1);

  const handleShare = () => {
    if (!selectedProgram) return;
    if (navigator.share) {
      navigator.share({
        title: selectedProgram.nama_proker,
        text: selectedProgram.deskripsi,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link berhasil disalin ke clipboard!');
    }
  };

  if (isLoading) return <div className="p-8 text-center text-gray-500">Memuat data...</div>;
  if (!selectedProgram) return <div className="p-8 text-center text-red-500">Program tidak ditemukan.</div>;

  const currentIndex = currentPhotoIndex[selectedProgram.id] ?? 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center justify-between p-4 max-w-4xl mx-auto">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Kembali</span>
          </button>
          
          <button
            onClick={handleShare}
            className="flex items-center space-x-2 px-3 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors"
          >
            <Share2 className="w-5 h-5" />
            <span className="font-medium">Bagikan</span>
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-4xl mx-auto p-4 pb-8">
        <div className="bg-white overflow-hidden">
          {/* Foto */}
          {selectedProgram.photos && selectedProgram.photos.length > 0 && (
            <div className="relative h-1/2 md:h-128">
              <img
                src={selectedProgram.photos[currentIndex]}
                alt={`${selectedProgram.nama_proker} - Foto ${currentIndex + 1}`}
                className="w-full h-full object-cover rounded-2xl"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-image.jpg";
                }}
              />

              {/* Navigasi Foto */}
              {selectedProgram.photos.length > 1 && (
                <>
                  <button
                    onClick={() => prevPhoto(selectedProgram.id, selectedProgram.photos.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-gray-800 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    onClick={() => nextPhoto(selectedProgram.id, selectedProgram.photos.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-gray-800 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Indikator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {selectedProgram.photos.map((_, i) => (
                      <button
                        key={i}
                        onClick={() =>
                          setCurrentPhotoIndex(prev => ({
                            ...prev,
                            [selectedProgram.id]: i,
                          }))
                        }
                        className={`w-2 h-2 rounded-full ${
                          i === currentIndex ? "bg-white w-6" : "bg-white/60 hover:bg-white/80"
                        } transition-all`}
                      />
                    ))}
                  </div>

                  {/* Counter */}
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {currentIndex + 1} / {selectedProgram.photos.length}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Konten */}
          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6">
              {selectedProgram.nama_proker}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 text-gray-600">
              {selectedProgram.tanggal && (
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                  <span>{selectedProgram.tanggal}</span>
                </div>
              )}
              {selectedProgram.lokasi && (
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-green-500" />
                  <span>{selectedProgram.lokasi}</span>
                </div>
              )}
            </div>

            {selectedProgram.deskripsi && (
              <div className="text-gray-700 leading-relaxed text-justify whitespace-pre-line">
                {Array.isArray(selectedProgram.deskripsi) ? (
                  <ul className="list-disc pl-6 space-y-2">
                    {selectedProgram.deskripsi.map((desc, i) => (
                      <li key={i} className="text-lg">{desc}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-lg">{selectedProgram.deskripsi}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KknDetail;
