import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useServices } from "@/hooks/useServices";
import ServiceApplicationForm from "./ServiceApplicationForm";

const ServicesSection = () => {
  const { data: services = [], isLoading } = useServices();
  const [selectedService, setSelectedService] = useState<{
    id: string;
    name: string;
  } | null>(null);

  if (isLoading) {
    return (
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <p>Loading layanan...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              Layanan Administrasi
            </h2>
          </div>

          {/* Service Info */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-4 sm:p-5 mb-8 text-white text-xs sm:text-sm">
            <div className="space-y-2">
              <div className="flex justify-between border-b border-white/20 pb-1">
                <span className="font-medium">Senin – Kamis</span>
                <span className="text-right">08.00 – 14.00 WIB</span>
              </div>
              <div className="flex justify-between border-b border-white/20 pb-1">
                <span className="font-medium">Jumat</span>
                <span className="text-right">08.00 – 14.00 WIB</span>
              </div>
              <div className="flex justify-between pt-1 text-green-100 italic text-[11px] sm:text-xs">
                <span>Sabtu, Minggu & Hari Libur</span>
                <span className="font-semibold not-italic text-right">
                  TUTUP
                </span>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services
              .filter((service) => service.status === "active")
              .map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
                >
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mr-4">
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
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {service.name}
                      </h3>
                    </div>

                    <p className="text-gray-600 mb-4">{service.description}</p>

                    {service.requirements && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">
                          Persyaratan:
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {service.requirements.split(",").map((req, idx) => (
                            <li key={idx}>• {req.trim()}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {service.process_time && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Waktu Proses:</span>{" "}
                          {service.process_time}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Tombol selalu di bawah */}
                  <div className="mt-auto pt-4">
                    <Button
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                      onClick={() => {
                        if (service.link) {
                          window.open(service.link, "_blank"); // buka di tab baru
                        } else {
                          alert("Link tidak tersedia."); // fallback jika tidak ada link
                        }
                      }}
                    >
                      Ajukan Permohonan
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Service Application Form Modal */}
      {selectedService && (
        <ServiceApplicationForm
          serviceId={selectedService.id}
          serviceName={selectedService.name}
          onClose={() => setSelectedService(null)}
        />
      )}
    </>
  );
};

export default ServicesSection;
