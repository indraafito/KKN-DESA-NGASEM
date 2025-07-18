
-- Create table for news/berita
CREATE TABLE public.news (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  excerpt TEXT,
  category TEXT,
  image_url TEXT,
  priority TEXT DEFAULT 'medium',
  status TEXT DEFAULT 'published',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS PUBLIC.ANNOUNCEMENTS (
  ID SERIAL PRIMARY KEY,
  TITLE TEXT NOT NULL,
  CONTENT TEXT NOT NULL,
  DATE DATE NOT NULL DEFAULT CURRENT_DATE,
  URGENT BOOLEAN DEFAULT FALSE
);

-- AKTIFKAN ROW-LEVEL SECURITY (RLS)
ALTER TABLE PUBLIC.ANNOUNCEMENTS ENABLE ROW LEVEL SECURITY;

-- POLICY AGAR BISA DIBACA PUBLIK
CREATE POLICY "PUBLIC READ ACCESS"
  ON PUBLIC.ANNOUNCEMENTS
  FOR SELECT
  USING (TRUE);

-- Create table for services/layanan
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  requirements TEXT,
  process_time TEXT,
  status TEXT DEFAULT 'active',
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for village profile/profil desa
CREATE TABLE public.village_profile (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  kepala_desa TEXT,
  visi TEXT,
  misi TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for announcements/pengumuman
CREATE TABLE public.announcements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  urgent BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.village_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (for website visitors)
CREATE POLICY "Anyone can view published news" ON public.news FOR SELECT USING (status = 'published');
CREATE POLICY "Anyone can view active services" ON public.services FOR SELECT USING (status = 'active');
CREATE POLICY "Anyone can view village profile" ON public.village_profile FOR SELECT USING (true);
CREATE POLICY "Anyone can view active announcements" ON public.announcements FOR SELECT USING (status = 'active');

-- Create admin policies (for now, we'll allow all operations - later we can add proper admin authentication)
CREATE POLICY "Admin can manage news" ON public.news FOR ALL USING (true);
CREATE POLICY "Admin can manage services" ON public.services FOR ALL USING (true);
CREATE POLICY "Admin can manage village profile" ON public.village_profile FOR ALL USING (true);
CREATE POLICY "Admin can manage announcements" ON public.announcements FOR ALL USING (true);

-- Insert default village profile data
INSERT INTO public.village_profile (kepala_desa, sekretaris_desa, visi, misi)
VALUES (
  'Bapak Suwito',
  'Ibu Siti Aminah',
  'Mewujudkan Desa Ngasety yang maju, mandiri, dan sejahtera berlandaskan gotong royong',
  '1. Meningkatkan kualitas pelayanan publik
2. Mengembangkan potensi ekonomi desa
3. Memperkuat tata kelola pemerintahan yang baik',
  'Jl. Raya Desa No. 123
Kecamatan Ngasety
Kabupaten Contoh
Provinsi Jawa Tengah',
  'Website Desa Ngasety',
  'Website resmi Pemerintah Desa Ngasety'
);

-- Insert sample services data
INSERT INTO public.services (name, description, requirements, process_time) VALUES
('Surat Keterangan Domisili', 'Penerbitan surat keterangan domisili untuk warga', 'KTP, KK, Surat pengantar RT/RW', '1-2 hari kerja', 'https://forms.gle/ujSFft5VUiWUTX6SA'),
('Surat Keterangan Usaha', 'Penerbitan surat keterangan usaha untuk keperluan bisnis', 'KTP, KK, Foto usaha, Surat pengantar RT/RW', '2-3 hari kerja', 'https://forms.gle/ujSFft5VUiWUTX6SA'),
('Surat Pengantar', 'Penerbitan surat pengantar untuk berbagai keperluan', 'KTP, KK, Dokumen pendukung', '1 hari kerja'),
('Surat Keterangan Tidak Mampu', 'Penerbitan surat keterangan tidak mampu', 'KTP, KK, Surat pengantar RT/RW, Surat keterangan penghasilan', '2-3 hari kerja');

-- Insert sample news data
INSERT INTO public.news (title, content, excerpt, category, priority) VALUES
('Program Pembangunan Jalan Desa', 'Pemerintah Desa Ngasety akan memulai program pembangunan jalan desa untuk meningkatkan akses transportasi warga.', 'Proyek perbaikan infrastruktur jalan desa memasuki fase kedua dengan target selesai pada bulan Maret 2024.', 'Pembangunan', 'high'),
('Pelatihan UMKM Digital Marketing', 'Desa Ngasety mengadakan pelatihan digital marketing untuk pelaku UMKM dalam rangka meningkatkan ekonomi desa.', 'Puluhan pelaku UMKM mengikuti pelatihan digital marketing untuk meningkatkan penjualan online.', 'Pelatihan', 'medium'),
('Festival Panen Raya 2024', 'Masyarakat Desa Ngasety merayakan festival panen raya dengan berbagai kegiatan budaya dan pameran hasil pertanian.', 'Masyarakat Desa Ngasety merayakan panen raya dengan berbagai kegiatan budaya dan pameran hasil pertanian.', 'Acara', 'medium');

INSERT INTO PUBLIC.ANNOUNCEMENTS (TITLE, CONTENT, URGENT)
VALUES 
  ('SELAMAT DATANG', 'SELAMAT DATANG DI APLIKASI KAMI.', FALSE),
  ('PEMBERITAHUAN PENTING', 'AKAN ADA PEMELIHARAAN SISTEM HARI JUMAT.', TRUE);

