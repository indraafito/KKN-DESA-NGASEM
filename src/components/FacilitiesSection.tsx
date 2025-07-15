

import { useFacilities } from "@/hooks/useFacilities";

const FacilitiesSection = () => {
  const { data: facilities = [], isLoading } = useFacilities();

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Sarana & Prasarana</h2>
        </div>

        {isLoading ? (
          <div className="text-center text-gray-500">Memuat data fasilitas...</div>
        ) : facilities.length === 0 ? (
          <div className="text-center text-gray-500">Belum ada data fasilitas.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <div key={facility.id || index} className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-center mb-4">
                  {/* Optional: facility.icon jika ada di database */}
                  {facility.icon && <div className="text-4xl mb-3">{facility.icon}</div>}
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{facility.name}</h3>
                </div>
                <p className="text-gray-600 text-center mb-4">{facility.description}</p>
                {/* Optional: features if available as array or comma-separated string */}
                {facility.features ? (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800 text-sm">Fasilitas:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {(Array.isArray(facility.features)
                        ? facility.features
                        : typeof facility.features === 'string'
                          ? (facility.features as string).split(',')
                          : []
                      ).map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-center">
                          <svg className="w-3 h-3 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature.trim()}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FacilitiesSection;
