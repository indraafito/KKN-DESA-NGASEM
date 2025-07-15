
import { Button } from "@/components/ui/button";
import { LogOut, User, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface AdminHeaderProps {
  onLogout: () => void;
}

const AdminHeader = ({ onLogout }: AdminHeaderProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    toast({
      title: "Logout Berhasil",
      description: "Anda telah keluar dari sistem admin",
    });
    // Redirect to login page after logout
    navigate('/admin/login');
  };

  const handleViewWebsite = () => {
    // Open the main website in a new tab
    window.open('/', '_blank');
  };

  return (
    <div className="flex justify-between items-center mb-8 p-4 bg-white rounded-lg shadow-sm border">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-600">Desa Ngasem</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button 
          onClick={handleViewWebsite}
          variant="outline"
          className="flex items-center space-x-2 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-600"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Lihat Website</span>
        </Button>
        
        <Button 
          onClick={handleLogout}
          variant="outline"
          className="flex items-center space-x-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default AdminHeader;
