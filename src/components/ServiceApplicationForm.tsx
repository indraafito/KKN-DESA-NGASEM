
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useCreateServiceApplication } from "@/hooks/useServiceApplications";
import { useImageUpload } from "@/hooks/useImageUpload";
import { X, Upload } from "lucide-react";

interface ServiceApplicationFormProps {
  serviceId: string;
  serviceName: string;
  onClose: () => void;
}

interface ServiceDocument {
  name: string;
  url: string;
}

const ServiceApplicationForm = ({ serviceId, serviceName, onClose }: ServiceApplicationFormProps) => {
  const { toast } = useToast();
  const { uploadImage, isUploading } = useImageUpload();
  const createApplication = useCreateServiceApplication();
  
  const [formData, setFormData] = useState({
    applicant_name: '',
    applicant_email: '',
    applicant_phone: '',
    applicant_address: '',
  });
  
  const [documents, setDocuments] = useState<ServiceDocument[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.applicant_name.trim() || !formData.applicant_email.trim() || !formData.applicant_phone.trim()) {
      toast({
        title: "Error",
        description: "Nama, email, dan nomor telepon harus diisi",
        variant: "destructive",
      });
      return;
    }

    try {
      await createApplication.mutateAsync({
        service_id: serviceId,
        ...formData,
        documents: documents.length > 0 ? documents as any : null,
      });

      toast({
        title: "Sukses",
        description: "Permohonan layanan berhasil dikirim",
      });
      
      onClose();
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Error",
        description: "Gagal mengirim permohonan",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (const file of Array.from(files)) {
      const url = await uploadImage(file, 'service-documents');
      if (url) {
        setDocuments(prev => [...prev, { name: file.name, url }]);
      }
    }
  };

  const removeDocument = (index: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Ajukan Permohonan: {serviceName}</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="applicant_name">Nama Lengkap *</Label>
                <Input
                  id="applicant_name"
                  value={formData.applicant_name}
                  onChange={(e) => handleChange('applicant_name', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="applicant_email">Email *</Label>
                <Input
                  id="applicant_email"
                  type="email"
                  value={formData.applicant_email}
                  onChange={(e) => handleChange('applicant_email', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="applicant_phone">Nomor Telepon *</Label>
                <Input
                  id="applicant_phone"
                  value={formData.applicant_phone}
                  onChange={(e) => handleChange('applicant_phone', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="applicant_address">Alamat</Label>
                <Input
                  id="applicant_address"
                  value={formData.applicant_address}
                  onChange={(e) => handleChange('applicant_address', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="documents">Upload Dokumen Pendukung</Label>
              <div className="mt-2">
                <input
                  type="file"
                  id="documents"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('documents')?.click()}
                  disabled={isUploading}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {isUploading ? 'Mengupload...' : 'Pilih File'}
                </Button>
              </div>
              
              {documents.length > 0 && (
                <div className="mt-4 space-y-2">
                  <Label>Dokumen yang diupload:</Label>
                  {documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm">{doc.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDocument(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-4">
              <Button 
                type="submit" 
                disabled={createApplication.isPending}
                className="bg-green-600 hover:bg-green-700"
              >
                {createApplication.isPending ? 'Mengirim...' : 'Kirim Permohonan'}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Batal
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceApplicationForm;
