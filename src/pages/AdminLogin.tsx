import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock, User, Eye, EyeOff, ChevronRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const success = login(username, password);
      if (success) {
        toast({
          title: "Login Berhasil",
          description: "Selamat datang, Admin!",
        });
        navigate("/admin/dashboard");
      } else {
        toast({
          title: "Login Gagal",
          description: "Username atau password salah",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      {/* Card Login */}
      <Card className="w-full max-w-md relative z-10 bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl">
        <CardHeader className="space-y-6 text-center pb-8">
          <div className="relative mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-green-400 to-blue-500 p-4 rounded-full">
              <img src="/headericon.png" alt="Admin Icon" className="w-16 h-16" />
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-green-700 bg-clip-text text-transparent">
              Admin Dashboard
            </CardTitle>
            <CardDescription className="text-gray-600 text-lg">
              Portal Administrasi Desa Ngasem
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700 font-medium">
                Username
              </Label>
              <div className="relative group">
                <User
                  className={`absolute left-3 top-3 h-5 w-5 transition-colors duration-200 ${
                    focusedField === "username" ? "text-green-600" : "text-gray-400"
                  }`}
                />
                <Input
                  id="username"
                  type="text"
                  placeholder="Masukkan username admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocusedField("username")}
                  onBlur={() => setFocusedField("")}
                  className={`pl-11 pr-4 py-3 bg-white/70 border-gray-200 text-gray-800 placeholder-gray-400 rounded-xl transition-all duration-200 ${
                    focusedField === "username"
                      ? "border-green-400 bg-white shadow-lg shadow-green-400/10"
                      : "hover:bg-white/80 hover:border-gray-300"
                  }`}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Password
              </Label>
              <div className="relative group">
                <Lock
                  className={`absolute left-3 top-3 h-5 w-5 transition-colors duration-200 ${
                    focusedField === "password" ? "text-green-600" : "text-gray-400"
                  }`}
                />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password admin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField("")}
                  className={`pl-11 pr-12 py-3 bg-white/70 border-gray-200 text-gray-800 placeholder-gray-400 rounded-xl transition-all duration-200 ${
                    focusedField === "password"
                      ? "border-green-400 bg-white shadow-lg shadow-green-400/10"
                      : "hover:bg-white/80 hover:border-gray-300"
                  }`}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 h-6 w-6 text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Sembunyikan password" : "Lihat password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full relative overflow-hidden group bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center space-x-2">
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <span>Masuk ke Dashboard</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </div>
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Floating Ping Dots */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-green-400/50 rounded-full animate-ping"></div>
      <div className="absolute bottom-20 right-20 w-3 h-3 bg-blue-400/50 rounded-full animate-ping delay-1000"></div>
      <div className="absolute top-1/3 right-10 w-1 h-1 bg-green-300/60 rounded-full animate-ping delay-2000"></div>
    </div>
  );
};

export default AdminLogin;
