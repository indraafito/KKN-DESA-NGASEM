import "../styles/custom-modal-scrollbar.css";
import React, { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { useAuth } from "@/hooks/useAuth";
import VillageProfileForm from "@/components/admin/VillageProfileForm";
import ServiceForm from "@/components/admin/ServiceForm";
import { useFacilities, useDeleteFacility } from "@/hooks/useFacilities";
import { useServices, useDeleteService } from "@/hooks/useServices";
import { useNews, useDeleteNews } from "@/hooks/useNews";
import {
  useVillageOfficials,
  useDeleteVillageOfficial,
} from "@/hooks/useVillageOfficials";
import {
  useCommunityPrograms,
  useDeleteCommunityProgram,
} from "@/hooks/useCommunityPrograms";
import { useKKNPrograms, useDeleteKKNProgram } from "@/hooks/useKKNPrograms";
import {
  useVillageStatistics,
  useDeleteVillageStatistic,
} from "@/hooks/useVillageStatistics";
import {
  useVillageAchievements,
  useDeleteVillageAchievement,
} from "@/hooks/useVillageAchievements";
import ServiceApplicationsTable from "@/components/admin/ServiceApplicationsTable";
import NewsForm from "@/components/admin/NewsForm";
import VillageOfficialForm from "@/components/admin/VillageOfficialForm";
import FacilityForm from "@/components/admin/FacilityForm";
import CommunityProgramForm from "@/components/admin/CommunityProgramForm";
import KKNProgramForm from "@/components/admin/KKNProgramForm";
import VillageStatisticForm from "@/components/admin/VillageStatisticForm";
import VillageAchievementForm from "@/components/admin/VillageAchievementForm";
import Modal from "@/components/admin/Modal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  SidebarProvider,
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Plus, Globe, LogOut } from "lucide-react";
import { useVillageProfile } from "@/hooks/useVillageProfile";

const AdminDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [modalTitle, setModalTitle] = useState("");
  const [selectedMenu, setSelectedMenu] = useState<string>("profile");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const openModal = (title: string, content: React.ReactNode) => {
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    setModalTitle("");
  };

  const handleSubmit = async (...args: any[]): Promise<void> => {};
  const handleCancel = () => {};
  const { logout } = useAuth();

  // Komponen header sidebar agar tidak error hooks
  const SidebarHeaderContent = () => {
    const { state } = useSidebar();
    if (state === "collapsed") {
      return (
        <div className="flex flex-col items-center gap-6">
          <div title="Dashboard" className="cursor-default">
            <img
              src="/headericon.png"
              alt="Admin Icon"
              className="w-10 h-10 rounded-full object-cover bg-white border border-emerald-100"
            />
          </div>
        </div>
      );
    }
    return (
      <div className="flex items-center space-x-4">
        <img
          src="/headericon.png"
          alt="Admin Icon"
          className="w-12 h-12 rounded-full object-cover bg-white border border-emerald-100"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </div>
    );
  };

  // Komponen header kanan hanya tombol menu, hidden saat sidebar terbuka
  const HeaderMenuButton = () => {
    const { state } = useSidebar();
    if (state !== "collapsed") return null;
    return (
      <div className="sticky top-0 z-20 bg-white shadow-sm border-b flex items-center h-16 px-4">
        <SidebarTrigger />
      </div>
    );
  };

  // Services
  const { data: services = [], isLoading: isServicesLoading } = useServices();
  const deleteService = useDeleteService();
  const handleDeleteService = (id: string) => {
    if (window.confirm("Yakin ingin menghapus layanan ini?")) {
      deleteService.mutate(id);
    }
  };

  // News
  const { data: news = [], isLoading: isNewsLoading } = useNews();
  const deleteNews = useDeleteNews();
  const handleDeleteNews = (id: string) => {
    if (window.confirm("Yakin ingin menghapus berita ini?")) {
      deleteNews.mutate(id);
    }
  };

  // Officials
  const { data: officials = [], isLoading: isOfficialsLoading } =
    useVillageOfficials();
  const deleteOfficial = useDeleteVillageOfficial();
  const handleDeleteOfficial = (id: string) => {
    if (window.confirm("Yakin ingin menghapus perangkat ini?")) {
      deleteOfficial.mutate(id);
    }
  };

  // Community Programs
  const {
    data: communityPrograms = [],
    isLoading: isCommunityProgramsLoading,
  } = useCommunityPrograms();
  const deleteCommunityProgram = useDeleteCommunityProgram();
  const handleDeleteCommunityProgram = (id: string) => {
    if (window.confirm("Yakin ingin menghapus program ini?")) {
      deleteCommunityProgram.mutate(id);
    }
  };

  // KKN Programs
  const { data: kknPrograms = [], isLoading: isKKNProgramsLoading } =
    useKKNPrograms();
  const deleteKKNProgram = useDeleteKKNProgram();
  const handleDeleteKKNProgram = (id: string) => {
    if (window.confirm("Yakin ingin menghapus program KKN ini?")) {
      deleteKKNProgram.mutate(id);
    }
  };

  // Village Statistics
  const { data: statistics = [], isLoading: isStatisticsLoading } =
    useVillageStatistics();
  const deleteStatistic = useDeleteVillageStatistic();
  const handleDeleteStatistic = (id: string) => {
    if (window.confirm("Yakin ingin menghapus statistik ini?")) {
      deleteStatistic.mutate(id);
    }
  };

  // Village Achievements
  const { data: achievements = [], isLoading: isAchievementsLoading } =
    useVillageAchievements();
  const deleteAchievement = useDeleteVillageAchievement();
  const handleDeleteAchievement = (id: string) => {
    if (window.confirm("Yakin ingin menghapus prestasi ini?")) {
      deleteAchievement.mutate(id);
    }
  };

  // Village Profile
  const { data: villageProfile, isLoading: isVillageProfileLoading } =
    useVillageProfile();

  return (
    <SidebarProvider>
      <div className="flex min-h-svh w-full bg-gray-50">
        {/* Sidebar */}
        <Sidebar
          collapsible="none"
          className="fixed left-0 top-0 w-[17rem] min-w-[17rem] max-w-[17rem] flex-shrink-0 z-20 border-r border-gray-200 bg-white/90 shadow-xl backdrop-blur-xl"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex flex-col gap-4 p-6 border-b border-emerald-100/40">
              <SidebarHeaderContent />
            </div>
            {/* Menu */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-2 py-4">
              <SidebarMenu>
                {[
                  { key: "profile", label: "Profil Desa" },
                  { key: "services", label: "Layanan" },
                  { key: "news", label: "Berita" },
                  { key: "officials", label: "Perangkat" },
                  { key: "facilities", label: "Fasilitas" },
                  { key: "programs", label: "Program" },
                  { key: "kkn", label: "KKN" },
                  { key: "statistics", label: "Statistik" },
                  { key: "achievements", label: "Prestasi" },
                ].map((item, idx, arr) => (
                  <React.Fragment key={item.key}>
                    <SidebarMenuItem>
                      <button
                        className={`w-full text-left px-4 py-2 rounded-xl transition font-semibold text-base tracking-wide relative overflow-hidden
                          ${
                            selectedMenu === item.key
                              ? "bg-gradient-to-r from-emerald-500/90 to-emerald-400/80 text-white shadow-lg border border-emerald-400 ring-2 ring-emerald-300"
                              : "hover:bg-emerald-50 text-emerald-900 border border-transparent"
                          }
                        `}
                        onClick={() => setSelectedMenu(item.key)}
                      >
                        {item.label}
                      </button>
                    </SidebarMenuItem>
                    {idx < arr.length - 1 && (
                      <div className="border-b border-emerald-100/60 mx-4" />
                    )}
                  </React.Fragment>
                ))}
              </SidebarMenu>
            </div>
            {/* Footer: Lihat Website & Logout */}
            <div className="p-4 border-t border-emerald-100/40 flex flex-col gap-2 mt-auto bg-white/70 backdrop-blur-xl">
              <Button
                onClick={() => window.open("/", "_blank")}
                className="flex items-center space-x-2 bg-emerald-600 border border-emerald-600 text-white hover:bg-emerald-700 hover:border-emerald-700 shadow-md rounded-xl py-2"
              >
                <Globe className="w-4 h-4" />
                <span>Lihat Website</span>
              </Button>
              <Button
                onClick={() => setShowLogoutModal(true)}
                className="flex items-center space-x-2 bg-red-600 border border-red-600 text-white hover:bg-red-700 hover:border-red-700 shadow-md rounded-xl py-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </Sidebar>
        {/* Main Content */}
        <div className="flex-1 min-w-0 flex flex-col min-h-svh w-full ml-[16rem]">
          <HeaderMenuButton />
          <div className="flex-1 w-full h-full px-6 py-8">
            <div className="mb-8"></div>
            {/* Konten berdasarkan menu */}
            {selectedMenu === "profile" && (
              <div className="bg-white/90 rounded-2xl p-0">
                <div className="flex flex-row items-center justify-between px-6 pt-6 pb-2">
                  <h2 className="text-xl font-bold mb-2">Profil Desa</h2>
                  <Button
                    onClick={() =>
                      openModal(
                        "Edit Profil Desa",
                        <VillageProfileForm
                          profile={villageProfile}
                          onSubmit={handleSubmit}
                          onCancel={closeModal}
                        />
                      )
                    }
                  >
                    Edit Profil
                  </Button>
                </div>
                <div className="px-6 pb-6">
                  {isVillageProfileLoading ? (
                    <div className="text-gray-500">Memuat profil desa...</div>
                  ) : !villageProfile ? (
                    <div className="text-gray-500">
                      Belum ada data profil desa.
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4 text-gray-700">
                      <div className="font-semibold text-base mb-1">
                        Preview Data Profil Desa
                      </div>
                      <div className="w-full bg-emerald-50/60 rounded-lg p-4 shadow-sm border border-emerald-100/60">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-xs">
                          <div className="flex flex-col">
                            <span className="text-emerald-700 font-semibold">
                              Nama Website
                            </span>
                            <span className="mt-0.5 text-gray-900 font-medium">
                              {villageProfile.website_name || "-"}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-emerald-700 font-semibold">
                              Kepala Desa
                            </span>
                            <span className="mt-0.5 text-gray-900 font-medium">
                              {villageProfile.kepala_desa || "-"}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-emerald-700 font-semibold">
                              Sekretaris Desa
                            </span>
                            <span className="mt-0.5 text-gray-900 font-medium">
                              {villageProfile.sekretaris_desa || "-"}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-emerald-700 font-semibold">
                              Alamat
                            </span>
                            <span className="mt-0.5 text-gray-900 font-medium">
                              {villageProfile.alamat || "-"}
                            </span>
                          </div>
                          <div className="flex flex-col md:col-span-2">
                            <span className="text-emerald-700 font-semibold">
                              Visi
                            </span>
                            <span className="mt-0.5 text-gray-900 font-medium whitespace-pre-line">
                              {villageProfile.visi || "-"}
                            </span>
                          </div>
                          <div className="flex flex-col md:col-span-2">
                            <span className="text-emerald-700 font-semibold">
                              Misi
                            </span>
                            <span className="mt-0.5 text-gray-900 font-medium whitespace-pre-line">
                              {villageProfile.misi || "-"}
                            </span>
                          </div>
                          <div className="flex flex-col md:col-span-2">
                            <span className="text-emerald-700 font-semibold">
                              Deskripsi
                            </span>
                            <span className="mt-0.5 text-gray-900 font-medium whitespace-pre-line">
                              {villageProfile.description || "-"}
                            </span>
                          </div>
                          <div className="flex flex-col md:col-span-2">
                            <span className="text-emerald-700 font-semibold">
                              Welcome Message
                            </span>
                            <span className="mt-0.5 text-gray-900 font-medium whitespace-pre-line">
                              {villageProfile.welcome_message || "-"}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-emerald-700 font-semibold">
                              Photo URL
                            </span>
                            <span className="mt-0.5 text-gray-900 font-medium">
                              {villageProfile.photo_url || "-"}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-emerald-700 font-semibold">
                              Video URL
                            </span>
                            <span className="mt-0.5 text-gray-900 font-medium">
                              {villageProfile.video_url || "-"}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-emerald-700 font-semibold">
                              Maps URL
                            </span>
                            <span className="mt-0.5 text-gray-900 font-medium">
                              {villageProfile.maps_url || "-"}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-emerald-700 font-semibold">
                              Latitude
                            </span>
                            <span className="mt-0.5 text-gray-900 font-medium">
                              {villageProfile.latitude ?? "-"}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-emerald-700 font-semibold">
                              Longitude
                            </span>
                            <span className="mt-0.5 text-gray-900 font-medium">
                              {villageProfile.longitude ?? "-"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-1 text-[11px] text-gray-500 italic">
                        Form: Semua field di atas dapat diedit melalui tombol
                        Edit Profil.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {selectedMenu === "services" && (
              <div className="bg-white/90 rounded-2xl p-0">
                <div className="flex flex-row items-center justify-between px-6 pt-6 pb-2">
                  <h2 className="text-xl font-bold">Layanan Desa</h2>
                  <Button
                    onClick={() =>
                      openModal(
                        "Tambah Layanan",
                        <ServiceForm
                          onSubmit={handleSubmit}
                          onCancel={closeModal}
                        />
                      )
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Layanan
                  </Button>
                </div>
                <div className="px-6 pb-6">
                  <div className="flex flex-col gap-3">
                    {isServicesLoading ? (
                      <div className="text-gray-500">
                        Memuat data layanan...
                      </div>
                    ) : services.length === 0 ? (
                      <div className="text-gray-500">Belum ada layanan.</div>
                    ) : (
                      services.map((service) => (
                        <div
                          key={service.id}
                          className="flex items-center justify-between bg-emerald-50 rounded-lg px-4 py-2"
                        >
                          <div className="flex flex-col gap-1">
                            <div className="font-semibold">{service.name}</div>
                            {service.requirements && (
                              <div className="text-xs text-gray-600">
                                Syarat: {service.requirements}
                              </div>
                            )}
                            {service.process_time && (
                              <div className="text-xs text-gray-600">
                                Waktu Proses: {service.process_time}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                openModal(
                                  "Edit Layanan",
                                  <ServiceForm
                                    service={service}
                                    onSubmit={handleSubmit}
                                    onCancel={closeModal}
                                  />
                                )
                              }
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteService(service.id)}
                            >
                              Hapus
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
            {selectedMenu === "applications" && (
              <div className="bg-white/90 rounded-2xl p-0">
                <div className="px-6 pt-6 pb-2">
                  <h2 className="text-xl font-bold mb-2">Permohonan Layanan</h2>
                </div>
                <div className="px-6 pb-6">
                  <ServiceApplicationsTable />
                </div>
              </div>
            )}
            {selectedMenu === "news" && (
              <div className="bg-white/90 rounded-2xl p-0">
                <div className="flex flex-row items-center justify-between px-6 pt-6 pb-2">
                  <h2 className="text-xl font-bold">Berita & Pengumuman</h2>
                  <Button
                    onClick={() =>
                      openModal(
                        "Tambah Berita",
                        <NewsForm
                          onSubmit={handleSubmit}
                          onCancel={closeModal}
                        />
                      )
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Berita
                  </Button>
                </div>
                <div className="px-6 pb-6">
                  <div className="flex flex-col gap-3">
                    {isNewsLoading ? (
                      <div className="text-gray-500">Memuat data berita...</div>
                    ) : news.length === 0 ? (
                      <div className="text-gray-500">Belum ada berita.</div>
                    ) : (
                      news.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between bg-emerald-50 rounded-lg px-4 py-2"
                        >
                          <div>
                            <div className="font-semibold">{item.title}</div>
                            <div className="text-xs text-gray-600 line-clamp-2 max-w-xs">
                              {item.excerpt ||
                                item.content?.slice(0, 80) + "..."}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                openModal(
                                  "Edit Berita",
                                  <NewsForm
                                    news={item}
                                    onSubmit={handleSubmit}
                                    onCancel={closeModal}
                                  />
                                )
                              }
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteNews(item.id)}
                            >
                              Hapus
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
            {selectedMenu === "officials" && (
              <div className="bg-white/90 rounded-2xl p-0">
                <div className="flex flex-row items-center justify-between px-6 pt-6 pb-2">
                  <h2 className="text-xl font-bold">Perangkat Desa</h2>
                  <Button
                    onClick={() =>
                      openModal(
                        "Tambah Perangkat Desa",
                        <VillageOfficialForm
                          onSubmit={handleSubmit}
                          onCancel={closeModal}
                        />
                      )
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Perangkat
                  </Button>
                </div>
                <div className="px-6 pb-6">
                  <div className="flex flex-col gap-3">
                    {isOfficialsLoading ? (
                      <div className="text-gray-500">
                        Memuat data perangkat...
                      </div>
                    ) : officials.length === 0 ? (
                      <div className="text-gray-500">Belum ada perangkat.</div>
                    ) : (
                      officials.map((official) => (
                        <div
                          key={official.id}
                          className="flex items-center justify-between bg-emerald-50 rounded-lg px-4 py-2"
                        >
                          <div>
                            <div className="font-semibold">
                              {official.position}
                            </div>
                            <div className="text-xs text-gray-600">
                              Nama: {official.name}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                openModal(
                                  "Edit Perangkat",
                                  <VillageOfficialForm
                                    official={official}
                                    onSubmit={handleSubmit}
                                    onCancel={closeModal}
                                  />
                                )
                              }
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteOfficial(official.id)}
                            >
                              Hapus
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
            {selectedMenu === "facilities" && (
              <div className="bg-white/90 rounded-2xl p-0">
                <div className="flex flex-row items-center justify-between px-6 pt-6 pb-2">
                  <h2 className="text-xl font-bold">Fasilitas Desa</h2>
                  <Button
                    onClick={() =>
                      openModal(
                        "Tambah Fasilitas",
                        <FacilityForm
                          onSubmit={handleSubmit}
                          onCancel={closeModal}
                        />
                      )
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Fasilitas
                  </Button>
                </div>
                <div className="px-6 pb-6">
                  <div className="flex flex-col gap-3">
                    {/* Fasilitas section is handled in FacilitiesSection component or needs correct hook/logic here */}
                  </div>
                </div>
              </div>
            )}
            {selectedMenu === "programs" && (
              <div className="bg-white/90 rounded-2xl p-0">
                <div className="flex flex-row items-center justify-between px-6 pt-6 pb-2">
                  <h2 className="text-xl font-bold">Program Komunitas</h2>
                  <Button
                    onClick={() =>
                      openModal(
                        "Tambah Program",
                        <CommunityProgramForm
                          onSubmit={handleSubmit}
                          onCancel={closeModal}
                        />
                      )
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Program
                  </Button>
                </div>
                <div className="px-6 pb-6">
                  <div className="flex flex-col gap-3">
                    {isCommunityProgramsLoading ? (
                      <div className="text-gray-500">
                        Memuat data program...
                      </div>
                    ) : communityPrograms.length === 0 ? (
                      <div className="text-gray-500">Belum ada program.</div>
                    ) : (
                      communityPrograms.map((program) => (
                        <div
                          key={program.id}
                          className="flex items-center justify-between bg-emerald-50 rounded-lg px-4 py-2"
                        >
                          <div>
                            <div className="font-semibold">{program.title}</div>
                            <div className="text-xs text-gray-600">
                              {program.description}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                openModal(
                                  "Edit Program",
                                  <CommunityProgramForm
                                    program={program}
                                    onSubmit={handleSubmit}
                                    onCancel={closeModal}
                                  />
                                )
                              }
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() =>
                                handleDeleteCommunityProgram(program.id)
                              }
                            >
                              Hapus
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
            {selectedMenu === "kkn" && (
              <div className="bg-white/90 rounded-2xl p-0">
                <div className="flex flex-row items-center justify-between px-6 pt-6 pb-2">
                  <h2 className="text-xl font-bold">Program KKN</h2>
                  <Button
                    onClick={() =>
                      openModal(
                        "Tambah Program KKN",
                        <KKNProgramForm
                          onSubmit={handleSubmit}
                          onCancel={closeModal}
                        />
                      )
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Program KKN
                  </Button>
                </div>
                <div className="px-6 pb-6">
                  <div className="flex flex-col gap-3">
                    {isKKNProgramsLoading ? (
                      <div className="text-gray-500">Memuat data KKN...</div>
                    ) : kknPrograms.length === 0 ? (
                      <div className="text-gray-500">
                        Belum ada program KKN.
                      </div>
                    ) : (
                      kknPrograms.map((program) => (
                        <div
                          key={program.id}
                          className="flex items-center justify-between bg-emerald-50 rounded-lg px-4 py-2"
                        >
                          <div>
                            <div className="font-semibold">{program.title}</div>
                            <div className="text-xs text-gray-600">
                              {program.period}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                openModal(
                                  "Edit KKN",
                                  <KKNProgramForm
                                    program={program}
                                    onSubmit={handleSubmit}
                                    onCancel={closeModal}
                                  />
                                )
                              }
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteKKNProgram(program.id)}
                            >
                              Hapus
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
            {selectedMenu === "statistics" && (
              <div className="bg-white/90 rounded-2xl p-0">
                <div className="flex flex-row items-center justify-between px-6 pt-6 pb-2">
                  <h2 className="text-xl font-bold">Statistik Desa</h2>
                  <Button
                    onClick={() =>
                      openModal(
                        "Tambah Statistik",
                        <VillageStatisticForm
                          onSubmit={handleSubmit}
                          onCancel={closeModal}
                        />
                      )
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Statistik
                  </Button>
                </div>
                <div className="px-6 pb-6">
                  <div className="flex flex-col gap-3">
                    {isStatisticsLoading ? (
                      <div className="text-gray-500">
                        Memuat data statistik...
                      </div>
                    ) : statistics.length === 0 ? (
                      <div className="text-gray-500">Belum ada statistik.</div>
                    ) : (
                      statistics.map((stat) => (
                        <div
                          key={stat.id}
                          className="flex items-center justify-between bg-emerald-50 rounded-lg px-4 py-2"
                        >
                          <div>
                            <div className="font-semibold">{stat.label}</div>
                            <div className="text-xs text-gray-600">
                              {stat.value}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                openModal(
                                  "Edit Statistik",
                                  <VillageStatisticForm
                                    statistic={stat}
                                    onSubmit={handleSubmit}
                                    onCancel={closeModal}
                                  />
                                )
                              }
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteStatistic(stat.id)}
                            >
                              Hapus
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
            {selectedMenu === "achievements" && (
              <div className="bg-white/90 rounded-2xl p-0">
                <div className="flex flex-row items-center justify-between px-6 pt-6 pb-2">
                  <h2 className="text-xl font-bold">Prestasi Desa</h2>
                  <Button
                    onClick={() =>
                      openModal(
                        "Tambah Prestasi",
                        <VillageAchievementForm
                          onSubmit={handleSubmit}
                          onCancel={closeModal}
                        />
                      )
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Prestasi
                  </Button>
                </div>
                <div className="px-6 pb-6">
                  <div className="flex flex-col gap-3">
                    {isAchievementsLoading ? (
                      <div className="text-gray-500">
                        Memuat data prestasi...
                      </div>
                    ) : achievements.length === 0 ? (
                      <div className="text-gray-500">Belum ada prestasi.</div>
                    ) : (
                      achievements.map((achievement) => (
                        <div
                          key={achievement.id}
                          className="flex items-center justify-between bg-emerald-50 rounded-lg px-4 py-2"
                        >
                          <div>
                            <div className="font-semibold">
                              {achievement.title}
                            </div>
                            <div className="text-xs text-gray-600">
                              {achievement.description}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                openModal(
                                  "Edit Prestasi",
                                  <VillageAchievementForm
                                    achievement={achievement}
                                    onSubmit={handleSubmit}
                                    onCancel={closeModal}
                                  />
                                )
                              }
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() =>
                                handleDeleteAchievement(achievement.id)
                              }
                            >
                              Hapus
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={modalTitle}
          size="lg"
        >
          <div
            className="max-h-[80vh] min-h-[200px] overflow-y-auto custom-modal-scrollbar"
            style={{ scrollbarWidth: "thin", scrollbarColor: "#d1fae5 #fff" }}
          >
            {modalContent}
          </div>
        </Modal>
        {/* Modal Konfirmasi Logout */}
        <Modal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          title="Konfirmasi Logout"
        >
          <div className="py-4 max-h-[80vh] overflow-y-auto custom-modal-scrollbar">
            <p className="mb-6 text-gray-700">
              Apakah Anda yakin ingin logout?
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowLogoutModal(false)}
              >
                Batal
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={() => {
                  setShowLogoutModal(false);
                  logout();
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
