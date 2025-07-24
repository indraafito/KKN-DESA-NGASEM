import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useVillageProfile } from "@/hooks/useVillageProfile";
import { useVillageStatistics } from "@/hooks/useVillageStatistics";
import * as Icons from "lucide-react";
import { useState } from "react";

const HeroSection = () => {
  const {
    data: profile,
    isLoading: profileLoading,
    error: profileError,
  } = useVillageProfile();
  const { data: statistics } = useVillageStatistics();

  const handleLocationClick = () => {
    const mapsUrl =
      profile?.maps_url || "https://maps.google.com/?q=Desa+Ngasem";
    window.open(mapsUrl, "_blank");
  };

  const welcomeMessage = profile?.welcome_message || "Selamat Datang di";

  // Function to get YouTube embed URL
  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return "";
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?rel=0&modestbranding=1`;
    }
    return url;
  };

  // Mock data for village area information - replace with actual data from your API
  const areaInformation = {
    total_area: "550.304 Ha",
    north_boundary: "Desa Maguan",
    south_boundary: "Desa Talangagung",
    east_boundary: "Desa Banjarsari",
    west_boundary: "Desa Ngajum",
    hamlets: ["Dusun Ngasem", "Dusun Sanan", "Dusun Babaan"],
    map_image_url: "/api/placeholder/600/400", // Replace with actual map image URL
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-500 opacity-70"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -right-8 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-stone-300/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 section-padding">
        <div className="container-responsive">
          {/* Hero Header */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center min-h-[70vh]">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium animate-bounce-in">
                  <a
                    href="https://maps.app.goo.gl/9pMdmZETWoQeWEAaA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded-full text-white text-sm font-medium animate-bounce-in hover:bg-white/20 transition-colors"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    {welcomeMessage}
                  </a>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-9xl font-bold text-white text-shadow leading-tight">
                  <span className="block animate-slide-up">DESA</span>
                  <span
                    className="block bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent animate-slide-up"
                    style={{ animationDelay: "0.2s" }}
                  >
                    NGASEM
                  </span>
                </h1>
                <div
                  className="animate-scale-in"
                  style={{ animationDelay: "0.3s" }}
                >
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                    Maju, Makmur, Melaju Bersama
                  </h2>
                </div>
              </div>
            </div>

            {/* Video */}
            <div className="w-full">
              <Card className="w-full overflow-hidden bg-white/20 backdrop-blur-md border border-white/10 shadow-none px-0">
                <CardContent className="p-0">
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                    {profile?.video_url ? (
                      <iframe
                        src={getYouTubeEmbedUrl(profile.video_url)}
                        title="Video Profil Desa Ngasem"
                        className="absolute top-0 left-0 w-full h-full rounded-xl"
                        allowFullScreen
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-stone-600/20 flex items-center justify-center rounded-xl">
                        <div className="text-center text-white">
                          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                            <svg
                              className="w-8 h-8"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                          <p className="text-lg font-medium">
                            Video akan segera ditambahkan
                          </p>
                          <p className="text-sm opacity-80">
                            Profil dan kegiatan Desa Ngasem
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Statistik */}
          {statistics && statistics.length > 0 && (
            <div
              className="mt-20 animate-slide-up px-4 sm:px-6 lg:px-8 max-w-none"
              style={{ animationDelay: "0.8s" }}
            >
              <div className="w-full">
                <div
                  className={`grid gap-6 w-full ${
                    statistics.length === 1
                      ? "grid-cols-1"
                      : statistics.length === 2
                      ? "grid-cols-1 sm:grid-cols-2"
                      : statistics.length === 3
                      ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                      : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                  }`}
                >
                  {statistics.map((stat) => {
                    const IconComponent = Icons[
                      stat.icon as keyof typeof Icons
                    ] as React.ComponentType<any>;
                    return (
                      <Card
                        key={stat.id}
                        className="w-full h-full bg-white/10 backdrop-blur-md border border-white/10 rounded-xl shadow-lg transition-transform duration-300 group hover:scale-[1.02]"
                      >
                        <CardContent className="p-6 text-center">
                          <div
                            className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${stat.color_class} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                          >
                            {IconComponent && (
                              <IconComponent className="w-8 h-8 text-white" />
                            )}
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                            {stat.value}
                          </h3>
                          <p className="text-white font-medium">{stat.label}</p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Peta dan Informasi Wilayah */}
          <div
            className="mt-16 animate-fade-in max-w-6xl mx-auto"
            style={{ animationDelay: "1.2s" }}
          >
            <h2 className="text-2xl font-bold text-center mb-8 text-white">
              Informasi Wilayah
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Peta */}
              <div className="flex justify-center">
                <div className="transform scale-75 origin-top bg-white/0 backdrop-blur-md rounded-lg overflow-hidden border border-white/10">
                  <img
                    src="/petangasem.png"
                    alt="Peta Desa Ngasem"
                    className="w-[90%] object-cover"
                  />
                </div>
              </div>

              {/* Informasi Wilayah */}
              <div className="space-y-6">
                <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Informasi Wilayah
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white">Luas Wilayah:</span>
                      <span className="text-white font-semibold">
                        {areaInformation.total_area}
                      </span>
                    </div>
                    <div className="border-t border-white/20 pt-3">
                      <h4 className="text-white font-semibold mb-2">
                        Batas Wilayah:
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex flex-col">
                          <span className="text-white">Utara:</span>
                          <span className="text-white">
                            {areaInformation.north_boundary}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-white">Selatan:</span>
                          <span className="text-white">
                            {areaInformation.south_boundary}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-white">Timur:</span>
                          <span className="text-white">
                            {areaInformation.east_boundary}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-white">Barat:</span>
                          <span className="text-white">
                            {areaInformation.west_boundary}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Daftar Dusun
                  </h3>
                  <div className="space-y-2">
                    {areaInformation.hamlets.map((hamlet, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-white/10 rounded-lg"
                      >
                        <span className="text-white font-medium">{hamlet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
