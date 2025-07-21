import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Logo dan Deskripsi */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div>
                <h3 className="text-xl font-bold">Desa Ngasem</h3>
                <p className="text-gray-400 text-sm">Pemerintah Desa</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Mewujudkan desa yang maju, mandiri, dan sejahtera berlandaskan gotong royong untuk kesejahteraan seluruh masyarakat.
            </p>
          </div>

          {/* Kontak */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Kontak Kami</h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-green-400 mt-1" />
                <div>
                  <p>Jl. Raya Sunan Muria No. 56</p>
                  <p>Kode Pos 65164</p>
                  <p>Kec. Ngasem, Kab. Malang</p>
                  <p>Provinsi Jawa Timur</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-400" />
                <span>081233553005</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-400" />
                <span>ngasem003@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Kolom KKN FMIPA UB 2025 */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">KKN FMIPA UB 2025</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              Website ini dikembangkan sebagai bagian dari program Kuliah Kerja Nyata oleh mahasiswa FMIPA Universitas Brawijaya tahun 2025, untuk mendukung digitalisasi dan transparansi informasi di Desa Ngasem.
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 KKN FMIPA UB 2025 Desa Ngasem. Semua hak cipta dilindungi.</p>
          <p className="mt-2">Website Pemerintah Desa Ngasem</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
