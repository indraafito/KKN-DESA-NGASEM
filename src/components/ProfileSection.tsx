import { useVillageProfile } from "@/hooks/useVillageProfile";
import { useVillageOfficials } from "@/hooks/useVillageOfficials";

const ProfileSection = () => {
  const { data: villageProfile, isLoading: profileLoading } =
    useVillageProfile();
  const { data: officials = [], isLoading: officialsLoading } =
    useVillageOfficials();

  const kepalaDesaOfficial = officials.find((official) =>
    official.position.toLowerCase().includes("kepala desa")
  );

  if (profileLoading || officialsLoading) {
    return (
      <section className="section-padding bg-gradient-to-b from-emerald-50 to-stone-50">
        <div className="container-responsive">
          <div className="text-center">
            <p>Memuat data profil desa...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-gradient-to-b from-emerald-50 to-stone-50">
      <div className="container-responsive">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-responsive-md font-bold text-emerald-800 mb-4 animate-fade-in">
            Struktur Pemerintahan Desa Ngasem
          </h2>
        </div>

        {/* Centered Kepala Desa */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="glassmorphism rounded-2xl shadow-lg p-5 sm:p-6 hover-lift animate-scale-in w-full mx-auto">
            <h3 className="text-lg sm:text-xl font-bold text-emerald-800 mb-4 text-center">
              Kepala Desa
            </h3>

            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              {/* Foto Kepala Desa */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-40 md:h-40 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 rounded-full flex items-center justify-center shadow-md overflow-hidden flex-shrink-0">
                {kepalaDesaOfficial?.photo_url ? (
                  <img
                    src={kepalaDesaOfficial.photo_url}
                    alt={kepalaDesaOfficial.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white text-xl sm:text-2xl font-bold">
                    KD
                  </span>
                )}
              </div>

              {/* Informasi Kepala Desa */}
              <div className="flex-1 text-center sm:text-left">
                <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-stone-800 mb-2">
                  {villageProfile?.kepala_desa ||
                    kepalaDesaOfficial?.name ||
                    "Bapak [Nama Kepala Desa]"}
                </h4>

                <div className="space-y-2">
                  <p className="text-sm sm:text-base text-stone-600">
                    Periode 2020–2026
                  </p>

                  <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3">
                    <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs sm:text-sm font-medium">
                      Aktif
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visi Misi Side by Side */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-10 mb-10 sm:mb-14">
          {[
            { label: "VISI", content: villageProfile?.visi },
            { label: "MISI", content: villageProfile?.misi },
          ].map((section, idx) => (
            <div
              key={idx}
              className="glassmorphism rounded-2xl shadow-lg p-5 sm:p-6 hover-lift animate-scale-in"
              style={{ animationDelay: `${idx * 0.2}s` }}
            >
              <div className="bg-green-50 rounded-xl p-4 sm:p-5 h-full">
                <h4 className="font-bold text-emerald-700 mb-4 text-base sm:text-lg text-center tracking-wide uppercase">
                  {section.label}
                </h4>
                <ol className="space-y-2 list-decimal list-inside text-sm sm:text-base marker:text-black text-stone-700">
                  {(section.content || "")
                    .split("\n")
                    .filter(Boolean)
                    .map((item, index) => {
                      const cleaned = item.replace(/^\d+\.\s*/, "");
                      return (
                        <li key={index} className="">
                          {cleaned}
                        </li>
                      );
                    })}
                </ol>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Jajaran Pengurus */}
        <div
          className="glassmorphism rounded-3xl shadow-xl p-6 sm:p-8 animate-slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-800 mb-8 text-center">
            Jajaran Pengurus Desa
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {officials
              .filter((official) => official.status === "active")
              .map((official, index) => (
                <div
                  key={official.id}
                  className="text-center p-4 sm:p-6 border-2 border-stone-100 rounded-2xl hover:shadow-lg hover:border-emerald-200 transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-br from-stone-500 via-stone-600 to-stone-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg overflow-hidden">
                    {official.photo_url ? (
                      <img
                        src={official.photo_url}
                        alt={official.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-bold text-sm sm:text-base lg:text-lg">
                        {official.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .substring(0, 2)}
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-stone-800 text-sm sm:text-base mb-1">
                    {official.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 mb-2">
                    {official.position}
                  </p>
                  {official.phone && (
                    <p className="text-xs text-stone-500 mb-1">
                      {official.phone}
                    </p>
                  )}
                  <div className="inline-block px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                    Aktif
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
