import { useState, useEffect } from "react";
import { Menu, X, Bell, ChevronUp, ChevronDown } from "lucide-react";
import { supabase } from "../integrations/supabase/client"; // Adjust the import path as necessary

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  urgent: boolean;
}

const Header = ({ activeSection, setActiveSection }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAnnouncements, setShowAnnouncements] = useState(true);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  const menuItems = [
    { id: "home", label: "Beranda" },
    { id: "profile", label: "Profil Desa" },
    { id: "services", label: "Layanan" },
    { id: "info", label: "Info Tambahan" },
    { id: "facilities", label: "Sarana & Prasarana" },
     { id: "news", label: "Berita & Update", path: "/news" },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .order("date", { ascending: false });

      if (error) {
        console.error("Error fetching announcements:", error.message || error);
      } else {
        console.log("Fetched data:", data);

      }
    };

    fetchAnnouncements();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showNotifications &&
        !(event.target as Element).closest(".notification-modal")
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNotifications]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glassmorphism shadow-xl py-2"
          : "bg-white/95 backdrop-blur-sm shadow-lg py-4"
      }`}
    >
      <div className="container-responsive">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 overflow-hidden">
              <img
                src="/headericon.png"
                alt="Header Icon"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h2 className="text-black text-lg sm:text-xl lg:text-2xl font-bold">
              Desa Ngasem
            </h2>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-4">
            <nav className="flex space-x-2 lg:space-x-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`px-3 py-2 lg:px-4 lg:py-2 rounded-xl transition-all duration-300 font-medium text-sm lg:text-base relative overflow-hidden group ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-emerald-600 to-emerald-400 text-white shadow-lg transform scale-105"
                      : "text-stone-700 hover:bg-gradient-to-r hover:from-emerald-100 hover:to-emerald-200 hover:text-emerald-800 hover:scale-105"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {activeSection !== item.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-stone-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  )}
                </button>
              ))}
            </nav>

            {/* Notification Button */}
            <div className="relative notification-modal">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-xl hover:bg-stone-100 transition-all duration-300 hover:scale-110"
              >
                <Bell size={24} className="text-stone-700" />
                {announcements.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {announcements.length}
                  </span>
                )}
              </button>

              {/* Notification Modal */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-stone-200 z-50">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-red-600 flex items-center">
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
                            d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                          />
                        </svg>
                        Pengumuman Penting
                      </h3>
                      <button
                        onClick={() => setShowAnnouncements(!showAnnouncements)}
                        className="flex items-center gap-1 text-sm text-blue-500 hover:underline"
                      >
                        {showAnnouncements ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </button>
                    </div>

                    {showAnnouncements && (
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {announcements.map((announcement) => (
                          <div
                            key={announcement.id}
                            className={`p-2 rounded-md border-l-4 text-xs ${
                              announcement.urgent
                                ? "bg-red-50 border-red-500"
                                : "bg-blue-50 border-blue-500"
                            }`}
                          >
                            <div className="flex justify-between items-start mb-0.5">
                              <h4 className="font-semibold text-gray-800">
                                {announcement.title}
                              </h4>
                              <span className="text-[10px] text-gray-500">
                                {formatDate(announcement.date)}
                              </span>
                            </div>
                            <p className="text-gray-700">
                              {announcement.content}
                            </p>
                            {announcement.urgent && (
                              <span className="inline-block mt-1 px-1.5 py-0.5 bg-red-500 text-white text-[9px] rounded-full">
                                URGENT
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl hover:bg-stone-100 transition-all duration-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Navigation */}
      {isMenuOpen && (
        <div className="xl:hidden bg-white border-t border-stone-200 shadow-md">
          <nav className="flex flex-col p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsMenuOpen(false); // Close after click
                }}
                className={`text-left px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-gradient-to-r from-emerald-600 to-emerald-400 text-white"
                    : "text-stone-700 hover:bg-emerald-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
