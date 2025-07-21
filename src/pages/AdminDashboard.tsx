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
import ServiceApplicationsTable from "@/components/admin/ServiceApplicationsTable";
import NewsForm from "@/components/admin/NewsForm";
import VillageOfficialForm from "@/components/admin/VillageOfficialForm";
import FacilityForm from "@/components/admin/FacilityForm";
import CommunityProgramForm from "@/components/admin/CommunityProgramForm";
import KKNProgramForm from "@/components/admin/KKNProgramForm";
import VillageStatisticForm from "@/components/admin/VillageStatisticForm";
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
import {
  Plus,
  Globe,
  LogOut,
  Home,
  Settings,
  Users,
  FileText,
  Building,
  Calendar,
  GraduationCap,
  BarChart3,
  Trophy,
  Sparkles,
  Shield,
  Pencil,
  Trash,
  Trash2,
} from "lucide-react";
import { useVillageProfile } from "@/hooks/useVillageProfile";
import { it } from "node:test";

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

  // Menu items with icons
  const menuItems = [
    { key: "profile", label: "Profil Desa", icon: Home },
    { key: "services", label: "Layanan", icon: Settings },
    { key: "news", label: "Berita", icon: FileText },
    { key: "officials", label: "Perangkat", icon: Users },
    { key: "facilities", label: "Fasilitas", icon: Building },
    { key: "programs", label: "Program", icon: Calendar },
    { key: "kkn", label: "KKN", icon: GraduationCap },
    { key: "statistics", label: "Statistik", icon: BarChart3 },
  ];

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState({
    type: "",
    id: "",
    title: "",
    message: "",
  });

  const openDeleteModal = (type, id, title, message) => {
    setDeleteModalData({ type, id, title, message });
    setShowDeleteModal(true);
  };

  // Komponen header sidebar agar tidak error hooks
  const SidebarHeaderContent = () => {
    const { state } = useSidebar();
    if (state === "collapsed") {
      return (
        <div className="flex flex-col items-center gap-6">
          <div title="Dashboard" className="cursor-default">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
          <Shield className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-600">Admin Panel</p>
        </div>
      </div>
    );
  };

  // Komponen header kanan hanya tombol menu, hidden saat sidebar terbuka
  const HeaderMenuButton = () => {
    const { state } = useSidebar();
    if (state !== "collapsed") return null;
    return (
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-200 flex items-center h-16 px-4">
        <SidebarTrigger className="hover:bg-gray-100 p-2 rounded-lg transition-colors" />
      </div>
    );
  };

  const handleConfirmDelete = () => {
    const { type, id } = deleteModalData;

    switch (type) {
      case "service":
        deleteService.mutate(id);
        break;
      case "news":
        deleteNews.mutate(id);
        break;
      case "official":
        deleteOfficial.mutate(id);
        break;
      case "facility":
        deleteFacility.mutate(id);
        break;
      case "program":
        deleteCommunityProgram.mutate(id);
        break;
      case "kkn":
        deleteKKNProgram.mutate(id);
        break;
      case "statistic":
        deleteStatistic.mutate(id);
        break;
    }

    setShowDeleteModal(false);
    setDeleteModalData({ type: "", id: "", title: "", message: "" });
  };

  // Services
  const { data: services = [], isLoading: isServicesLoading } = useServices();
  const deleteService = useDeleteService();
  const handleDeleteService = (id, name) => {
    openDeleteModal(
      "service",
      id,
      "Hapus Layanan",
      `Yakin ingin menghapus layanan "${name}"?`
    );
  };

  // News
  const { data: news = [], isLoading: isNewsLoading } = useNews();
  const deleteNews = useDeleteNews();
  const handleDeleteNews = (id : string, title : string) => {
    openDeleteModal(
      "news",
      id,
      "Hapus Berita",
      `Yakin ingin menghapus berita "${title}"?`
    );
  };

  // Officials
  const { data: officials = [], isLoading: isOfficialsLoading } =
    useVillageOfficials();
  const deleteOfficial = useDeleteVillageOfficial();
  const handleDeleteOfficial = (id, name) => {
    openDeleteModal(
      "official",
      id,
      "Hapus Perangkat",
      `Yakin ingin menghapus perangkat "${name}"?`
    );
  };

  // Community Programs
  const {
    data: communityPrograms = [],
    isLoading: isCommunityProgramsLoading,
  } = useCommunityPrograms();
  const deleteCommunityProgram = useDeleteCommunityProgram();
  const handleDeleteCommunityProgram = (id, title) => {
    openDeleteModal(
      "program",
      id,
      "Hapus Program",
      `Yakin ingin menghapus program "${title}"?`
    );
  };

  // KKN Programs
  const { data: kknPrograms = [], isLoading: isKKNProgramsLoading } =
    useKKNPrograms();
  const deleteKKNProgram = useDeleteKKNProgram();
  const handleDeleteKKNProgram = (id, title) => {
    openDeleteModal(
      "kkn",
      id,
      "Hapus Program KKN",
      `Yakin ingin menghapus program KKN "${title}"?`
    );
  };

  // Village Statistics
  const { data: statistics = [], isLoading: isStatisticsLoading } =
    useVillageStatistics();
  const deleteStatistic = useDeleteVillageStatistic();
  const handleDeleteStatistic = (id, label) => {
    openDeleteModal(
      "statistic",
      id,
      "Hapus Statistik",
      `Yakin ingin menghapus statistik "${label}"?`
    );
  };

  const { data: facilities = [], isLoading: isFacilitiesLoading } =
    useFacilities();
  const deleteFacility = useDeleteFacility();
  const handleDeleteFacility = (id, name) => {
    openDeleteModal(
      "facility",
      id,
      "Hapus Fasilitas",
      `Yakin ingin menghapus fasilitas "${name}"?`
    );
  };

  // Village Profile
  const { data: villageProfile, isLoading: isVillageProfileLoading } =
    useVillageProfile();

  return (
    <SidebarProvider>
      <div className="flex min-h-svh w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Sidebar */}
        <Sidebar
          collapsible="none"
          className="fixed left-0 top-0 w-[18rem] min-w-[18rem] max-w-[18rem] flex-shrink-0 z-20 border-r border-gray-200/50 bg-white/95 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex flex-col gap-4 p-6 border-b border-gray-200/50 bg-gradient-to-r from-emerald-50 to-blue-50">
              <SidebarHeaderContent />
            </div>

            {/* Menu */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-3 py-6">
              <SidebarMenu className="space-y-2">
                {menuItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem key={item.key}>
                      <button
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm tracking-wide relative overflow-hidden group
                          ${
                            selectedMenu === item.key
                              ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/25 scale-105"
                              : "hover:bg-gradient-to-r hover:from-emerald-50 hover:to-blue-50 text-gray-700 hover:text-emerald-700 hover:shadow-md"
                          }
                        `}
                        onClick={() => setSelectedMenu(item.key)}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon
                            className={`w-5 h-5 ${
                              selectedMenu === item.key
                                ? "text-white"
                                : "text-gray-500 group-hover:text-emerald-600"
                            }`}
                          />
                          <span>{item.label}</span>
                        </div>
                        {selectedMenu === item.key && (
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-xl animate-pulse" />
                        )}
                      </button>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </div>

            {/* Footer: Lihat Website & Logout */}
            <div className="p-4 border-t border-gray-200/50 flex flex-col gap-3 mt-auto bg-gradient-to-r from-gray-50 to-blue-50">
              <Button
                onClick={() => window.open("/", "_blank")}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg shadow-emerald-500/25 rounded-xl py-3 transition-all duration-200 hover:scale-105"
              >
                <Globe className="w-4 h-4" />
                <span>Lihat Website</span>
              </Button>
              <Button
                onClick={() => setShowLogoutModal(true)}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/25 rounded-xl py-3 transition-all duration-200 hover:scale-105"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 min-w-0 flex flex-col min-h-svh w-full ml-[17rem]">
          <HeaderMenuButton />
          <div className="flex-1 w-full h-full px-8 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-2">
                {React.createElement(
                  menuItems.find((item) => item.key === selectedMenu)?.icon ||
                    Home,
                  {
                    className: "w-8 h-8 text-emerald-600",
                  }
                )}
                <h1 className="text-3xl font-bold text-gray-900">
                  {menuItems.find((item) => item.key === selectedMenu)?.label ||
                    "Dashboard"}
                </h1>
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"></div>
            </div>

            {/* Content Cards */}
            {selectedMenu === "profile" && (
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-500 to-blue-500 px-8 py-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <Home className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-white">
                        Profil Desa
                      </h2>
                    </div>
                    <Button
                      onClick={() =>
                        openModal(
                          "Edit Profil Desa",
                          <VillageProfileForm
                            profile={villageProfile}
                            onCancel={closeModal}
                          />
                        )
                      }
                      className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Edit Profil
                    </Button>
                  </div>
                </div>
                <div className="p-8">
                  {isVillageProfileLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
                      <span className="ml-3 text-gray-600">
                        Memuat profil desa...
                      </span>
                    </div>
                  ) : !villageProfile ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Home className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500">
                        Belum ada data profil desa.
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-6">
                      <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-6 border border-emerald-200/50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                          <div className="flex flex-col space-y-1">
                            <span className="text-emerald-700 font-semibold">
                              Kepala Desa
                            </span>
                            <span className="text-gray-900 font-medium bg-white/60 rounded-lg px-3 py-2">
                              {villageProfile.kepala_desa || "-"}
                            </span>
                          </div>
                          <div className="flex flex-col space-y-1 md:col-span-2">
                            <span className="text-emerald-700 font-semibold">
                              Visi
                            </span>
                            <span className="text-gray-900 font-medium bg-white/60 rounded-lg px-3 py-2 whitespace-pre-line">
                              {villageProfile.visi || "-"}
                            </span>
                          </div>
                          <div className="flex flex-col space-y-1 md:col-span-2">
                            <span className="text-emerald-700 font-semibold">
                              Misi
                            </span>
                            <span className="text-gray-900 font-medium bg-white/60 rounded-lg px-3 py-2 whitespace-pre-line">
                              {villageProfile.misi || "-"}
                            </span>
                          </div>
                          <div className="flex flex-col space-y-1 md:col-span-2">
                            <span className="text-emerald-700 font-semibold">
                              Welcome Message
                            </span>
                            <span className="text-gray-900 font-medium bg-white/60 rounded-lg px-3 py-2 whitespace-pre-line">
                              {villageProfile.welcome_message || "-"}
                            </span>
                          </div>
                          <div className="flex flex-col space-y-1">
                            <span className="text-emerald-700 font-semibold">
                              Photo URL
                            </span>
                            <span className="text-gray-900 font-medium bg-white/60 rounded-lg px-3 py-2 break-all">
                              {villageProfile.photo_url || "-"}
                            </span>
                          </div>
                          <div className="flex flex-col space-y-1">
                            <span className="text-emerald-700 font-semibold">
                              Video URL
                            </span>
                            <span className="text-gray-900 font-medium bg-white/60 rounded-lg px-3 py-2 break-all">
                              {villageProfile.video_url || "-"}
                            </span>
                          </div>
                          <div className="flex flex-col space-y-1">
                            <span className="text-emerald-700 font-semibold">
                              Maps URL
                            </span>
                            <span className="text-gray-900 font-medium bg-white/60 rounded-lg px-3 py-2 break-all">
                              {villageProfile.maps_url || "-"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 italic bg-blue-50 rounded-lg p-3 border border-blue-200">
                        💡 Semua field di atas dapat diedit melalui tombol Edit
                        Profil.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {selectedMenu === "services" && (
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <Settings className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-white">
                        Layanan Desa
                      </h2>
                    </div>
                    <Button
                      onClick={() =>
                        openModal(
                          "Tambah Layanan",
                          <ServiceForm onCancel={closeModal} />
                        )
                      }
                      className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Layanan
                    </Button>
                  </div>
                </div>
                <div className="p-8">
                  <div className="grid gap-4">
                    {isServicesLoading ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        <span className="ml-3 text-gray-600">
                          Memuat data layanan...
                        </span>
                      </div>
                    ) : services.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Settings className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500">Belum ada layanan.</p>
                      </div>
                    ) : (
                      services.map((service, index) => (
                        <div
                          key={service.id}
                          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200/50 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                  {index + 1}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                  {service.name}
                                </h3>
                              </div>
                              {service.requirements && (
                                <div className="text-sm text-gray-600 bg-white/60 rounded-lg px-3 py-2">
                                  <strong>Syarat:</strong>{" "}
                                  {service.requirements}
                                </div>
                              )}
                              {service.process_time && (
                                <div className="text-sm text-gray-600 bg-white/60 rounded-lg px-3 py-2">
                                  <strong>Waktu Proses:</strong>{" "}
                                  {service.process_time}
                                </div>
                              )}
                            </div>
                            <div className="flex gap-2 ml-4">
                              <Button
                                size="sm"
                                onClick={() =>
                                  openModal(
                                    "Edit Layanan",
                                    <ServiceForm
                                      service={service}
                                      onCancel={closeModal}
                                    />
                                  )
                                }
                                className="text-white bg-blue-600 hover:bg-blue-700 border border-blue-700 flex items-center gap-1"
                              >
                                <Pencil className="w-4 h-4" />
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() =>
                                  handleDeleteService(service.id, service.name)
                                }
                                className="bg-red-500 hover:bg-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                                Hapus
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {selectedMenu === "applications" && (
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      Permohonan Layanan
                    </h2>
                  </div>
                </div>
                <div className="p-8">
                  <ServiceApplicationsTable />
                </div>
              </div>
            )}

            {selectedMenu === "news" && (
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-teal-500 px-8 py-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-white">
                        Berita & Pengumuman
                      </h2>
                    </div>
                    <Button
                      onClick={() =>
                        openModal(
                          "Tambah Berita",
                          <NewsForm onCancel={closeModal} />
                        )
                      }
                      className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Berita
                    </Button>
                  </div>
                </div>
                <div className="p-8">
                  <div className="grid gap-4">
                    {isNewsLoading ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                        <span className="ml-3 text-gray-600">
                          Memuat data berita...
                        </span>
                      </div>
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
                              onClick={() =>
                                openModal(
                                  "Edit Berita",
                                  <NewsForm news={item} onCancel={closeModal} />
                                )
                              }
                              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                            >
                              <Pencil className="w-4 h-4" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteNews(item.id, item.title)}
                            >
                              <Trash2 className="w-4 h-4" />
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
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-8 py-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-white">
                        Perangkat Desa
                      </h2>
                    </div>
                    <Button
                      onClick={() =>
                        openModal(
                          "Tambah Perangkat Desa",
                          <VillageOfficialForm onCancel={closeModal} />
                        )
                      }
                      className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Perangkat
                    </Button>
                  </div>
                </div>
                <div className="p-8">
                  <div className="grid gap-4">
                    {isOfficialsLoading ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        <span className="ml-3 text-gray-600">
                          Memuat data perangkat...
                        </span>
                      </div>
                    ) : officials.length === 0 ? (
                      <div className="text-center py-12">
                        <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">
                          Belum ada perangkat desa
                        </p>
                        <p className="text-gray-400 text-sm">
                          Klik tombol "Tambah Perangkat" untuk menambahkan
                          perangkat baru
                        </p>
                      </div>
                    ) : (
                      officials.map((official) => (
                        <div
                          key={official.id}
                          className="flex items-center justify-between bg-blue-50 rounded-lg px-4 py-3 hover:bg-blue-100 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="font-semibold text-gray-800">
                              {official.position}
                            </div>
                            <div className="text-xs text-gray-600 mt-1">
                              Nama: {official.name}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="bg-blue-500 text-white hover:bg-blue-600"
                              onClick={() =>
                                openModal(
                                  "Edit Perangkat",
                                  <VillageOfficialForm
                                    official={official}
                                    onCancel={closeModal}
                                  />
                                )
                              }
                            >
                              <Pencil className="w-4 h-4 mr-1" />
                              Edit
                            </Button>

                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteOfficial(official.id, official.name)}
                              className="hover:bg-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
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
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <Building className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-white">
                        Fasilitas Desa
                      </h2>
                    </div>
                    <Button
                      onClick={() =>
                        openModal(
                          "Tambah Fasilitas",
                          <FacilityForm onCancel={closeModal} />
                        )
                      }
                      className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Fasilitas
                    </Button>
                  </div>
                </div>
                <div className="p-8">
                  <div className="grid gap-4">
                    {isFacilitiesLoading ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                        <span className="ml-3 text-gray-600">
                          Memuat data fasilitas...
                        </span>
                      </div>
                    ) : facilities.length === 0 ? (
                      <div className="text-center py-12">
                        <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">
                          Belum ada fasilitas
                        </p>
                        <p className="text-gray-400 text-sm">
                          Klik tombol "Tambah Fasilitas" untuk menambahkan
                          fasilitas baru
                        </p>
                      </div>
                    ) : (
                      facilities.map((facility) => (
                        <div
                          key={facility.id}
                          className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200/50 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                                  <Building className="w-4 h-4 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                  {facility.name}
                                </h3>
                              </div>
                              {facility.description && (
                                <div className="text-sm text-gray-600 bg-white/60 rounded-lg px-3 py-2">
                                  <strong>Deskripsi:</strong>{" "}
                                  {facility.description}
                                </div>
                              )}
                            </div>
                            <div className="flex gap-2 ml-4">
                              <Button
                                size="sm"
                                onClick={() =>
                                  openModal(
                                    "Edit Fasilitas",
                                    <FacilityForm
                                      facility={facility}
                                      onCancel={closeModal}
                                    />
                                  )
                                }
                                className="bg-blue-500 hover:bg-blue-600 text-white border border-blue-600"
                              >
                                <Pencil className="w-4 h-4" />
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() =>
                                  handleDeleteFacility(facility.id, facility.name)
                                }
                                className="bg-red-500 hover:bg-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                                Hapus
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
            {selectedMenu === "programs" && (
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 px-8 py-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-white">
                        Program Komunitas
                      </h2>
                    </div>
                    <Button
                      onClick={() =>
                        openModal(
                          "Tambah Program",
                          <CommunityProgramForm onCancel={closeModal} />
                        )
                      }
                      className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Program
                    </Button>
                  </div>
                </div>
                <div className="p-8">
                  <div className="grid gap-4">
                    {isCommunityProgramsLoading ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                        <span className="ml-3 text-gray-600">
                          Memuat data program...
                        </span>
                      </div>
                    ) : communityPrograms.length === 0 ? (
                      <div className="text-center py-12">
                        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">
                          Belum ada program komunitas
                        </p>
                        <p className="text-gray-400 text-sm">
                          Klik tombol "Tambah Program" untuk menambahkan program
                          baru
                        </p>
                      </div>
                    ) : (
                      communityPrograms.map((program) => (
                        <div
                          key={program.id}
                          className="flex items-center justify-between bg-orange-50 rounded-lg px-4 py-3 hover:bg-orange-100 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="font-semibold text-gray-800">
                              {program.title}
                            </div>
                            <div className="text-xs text-gray-600 mt-1">
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
                                    onCancel={closeModal}
                                  />
                                )
                              }
                              className="bg-blue-500 hover:bg-blue-600 text-white border border-blue-600"
                            >
                              <Pencil className="w-4 h-4 mr-1" />
                              Edit
                            </Button>

                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() =>
                                handleDeleteCommunityProgram(program.id, program.title)
                              }
                              className="hover:bg-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
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
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-white">
                        Program KKN
                      </h2>
                    </div>
                    <Button
                      onClick={() =>
                        openModal(
                          "Tambah Program KKN",
                          <KKNProgramForm onCancel={closeModal} />
                        )
                      }
                      className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Program KKN
                    </Button>
                  </div>
                </div>
                <div className="p-8">
                  <div className="grid gap-4">
                    {isKKNProgramsLoading ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
                        <span className="ml-3 text-gray-600">
                          Memuat data KKN...
                        </span>
                      </div>
                    ) : kknPrograms.length === 0 ? (
                      <div className="text-center py-12">
                        <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">
                          Belum ada program KKN
                        </p>
                        <p className="text-gray-400 text-sm">
                          Klik tombol "Tambah Program KKN" untuk menambahkan
                          program baru
                        </p>
                      </div>
                    ) : (
                      kknPrograms.map((program) => (
                        <div
                          key={program.id}
                          className="flex items-center justify-between bg-cyan-50 rounded-lg px-4 py-3 hover:bg-cyan-100 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="font-semibold text-gray-800">
                              {program.nama_proker}
                            </div>
                            <div className="text-xs text-gray-600 mt-1">
                              {program.tanggal}
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
                                    onCancel={closeModal}
                                  />
                                )
                              }
                              className="bg-blue-500 hover:bg-blue-600 text-white border border-blue-600"
                            >
                              <Pencil className="w-4 h-4" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteKKNProgram(program.id, program.nama_proker)}
                              className="hover:bg-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
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
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-500 to-green-500 px-8 py-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-white">
                        Statistik Desa
                      </h2>
                    </div>
                    <Button
                      onClick={() =>
                        openModal(
                          "Tambah Statistik",
                          <VillageStatisticForm onCancel={closeModal} />
                        )
                      }
                      className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Statistik
                    </Button>
                  </div>
                </div>
                <div className="p-8">
                  <div className="grid gap-4">
                    {isStatisticsLoading ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
                        <span className="ml-3 text-gray-600">
                          Memuat data statistik...
                        </span>
                      </div>
                    ) : statistics.length === 0 ? (
                      <div className="text-center py-12">
                        <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">
                          Belum ada statistik
                        </p>
                        <p className="text-gray-400 text-sm">
                          Klik tombol "Tambah Statistik" untuk menambahkan
                          statistik baru
                        </p>
                      </div>
                    ) : (
                      statistics.map((stat) => (
                        <div
                          key={stat.id}
                          className="flex items-center justify-between bg-emerald-50 rounded-lg px-4 py-3 hover:bg-emerald-100 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="font-semibold text-gray-800">
                              {stat.label}
                            </div>
                            <div className="text-xs text-gray-600 mt-1">
                              {stat.value}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              onClick={() =>
                                openModal(
                                  "Edit Statistik",
                                  <VillageStatisticForm
                                    statistic={stat} // <-- kirim data yang akan diedit
                                    onCancel={closeModal}
                                  />
                                )
                              }
                              className="bg-blue-600 hover:bg-blue-700 text-white border border-blue-700 shadow"
                            >
                              <Pencil className="w-4 h-4 mr-2" />
                              Edit
                            </Button>

                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteStatistic(stat.id, stat.label)}
                              className="hover:bg-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
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
        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title=""
          size="sm"
        >
          <div className="py-6 px-2">
            {/* Icon dan Header */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {deleteModalData.title}
              </h3>
              <p className="text-gray-600">{deleteModalData.message}</p>
              <div className="mt-3 px-3 py-2 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm text-red-700">
                  ⚠️ Tindakan ini tidak dapat dibatalkan
                </p>
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(false)}
                className="px-6 py-2 border-gray-300 hover:bg-gray-50"
              >
                Batal
              </Button>
              <Button
                onClick={handleConfirmDelete}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/25"
              >
                Ya, Hapus
              </Button>
            </div>
          </div>
        </Modal>
        {/* Modal Konfirmasi Logout */}
        <Modal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          title=""
          size="sm"
        >
          <div className="py-6 px-2">
            {/* Icon dan Header */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <LogOut className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Konfirmasi Logout
              </h3>
              <p className="text-gray-600">
                Apakah Anda yakin ingin keluar dari dashboard admin?
              </p>
            </div>

            {/* Tombol Aksi */}
            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                onClick={() => setShowLogoutModal(false)}
                className="px-6 py-2 border-gray-300 hover:bg-gray-50"
              >
                Batal
              </Button>
              <Button
                onClick={() => {
                  setShowLogoutModal(false);
                  logout();
                }}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/25"
              >
                Ya, Logout
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
