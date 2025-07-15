
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useServiceApplications, useUpdateServiceApplication, useDeleteServiceApplication } from "@/hooks/useServiceApplications";
import { useToast } from "@/hooks/use-toast";
import { Eye, Trash2, Download } from "lucide-react";

const ServiceApplicationsTable = () => {
  const { data: applications = [], isLoading } = useServiceApplications();
  const updateApplication = useUpdateServiceApplication();
  const deleteApplication = useDeleteServiceApplication();
  const { toast } = useToast();
  const [selectedApplication, setSelectedApplication] = useState<any>(null);

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await updateApplication.mutateAsync({
        id,
        status,
        updated_at: new Date().toISOString(),
      });
      
      toast({
        title: "Sukses",
        description: "Status permohonan berhasil diperbarui",
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Gagal memperbarui status",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus permohonan ini?')) return;
    
    try {
      await deleteApplication.mutateAsync(id);
      toast({
        title: "Sukses",
        description: "Permohonan berhasil dihapus",
      });
    } catch (error) {
      console.error('Error deleting application:', error);
      toast({
        title: "Error",
        description: "Gagal menghapus permohonan",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Menunggu';
      case 'approved': return 'Disetujui';
      case 'rejected': return 'Ditolak';
      default: return status;
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Permohonan Layanan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Layanan</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telepon</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Dokumen</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell className="font-medium">{application.applicant_name}</TableCell>
                    <TableCell>{application.services?.name}</TableCell>
                    <TableCell>{application.applicant_email}</TableCell>
                    <TableCell>{application.applicant_phone}</TableCell>
                    <TableCell>
                      <Select
                        value={application.status || 'pending'}
                        onValueChange={(value) => handleStatusUpdate(application.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Menunggu</SelectItem>
                          <SelectItem value="approved">Disetujui</SelectItem>
                          <SelectItem value="rejected">Ditolak</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      {new Date(application.submitted_at).toLocaleDateString('id-ID')}
                    </TableCell>
                    <TableCell>
                      {application.documents && Array.isArray(application.documents) && application.documents.length > 0 ? (
                        <div className="space-y-1">
                          {application.documents.map((doc: any, index: number) => (
                            <div key={index} className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => window.open(doc.url, '_blank')}
                              >
                                <Download className="h-4 w-4 mr-1" />
                                {doc.name}
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-500">Tidak ada</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedApplication(application)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(application.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Detail Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Detail Permohonan</CardTitle>
                <Button variant="ghost" onClick={() => setSelectedApplication(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <strong>Nama:</strong> {selectedApplication.applicant_name}
                </div>
                <div>
                  <strong>Email:</strong> {selectedApplication.applicant_email}
                </div>
                <div>
                  <strong>Telepon:</strong> {selectedApplication.applicant_phone}
                </div>
                <div>
                  <strong>Layanan:</strong> {selectedApplication.services?.name}
                </div>
              </div>
              
              {selectedApplication.applicant_address && (
                <div>
                  <strong>Alamat:</strong> {selectedApplication.applicant_address}
                </div>
              )}
              
              <div>
                <strong>Status:</strong> 
                <Badge className={`ml-2 ${getStatusColor(selectedApplication.status || 'pending')}`}>
                  {getStatusText(selectedApplication.status || 'pending')}
                </Badge>
              </div>
              
              <div>
                <strong>Tanggal Pengajuan:</strong> {new Date(selectedApplication.submitted_at).toLocaleString('id-ID')}
              </div>
              
              {selectedApplication.notes && (
                <div>
                  <strong>Catatan:</strong> {selectedApplication.notes}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ServiceApplicationsTable;
