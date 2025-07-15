
-- Create table for village officials/perangkat desa
CREATE TABLE public.village_officials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  photo_url TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  status TEXT DEFAULT 'active',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add image_url column to news table if not exists
ALTER TABLE public.news ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Add photo_url column to village_profile table if not exists  
ALTER TABLE public.village_profile ADD COLUMN IF NOT EXISTS photo_url TEXT;

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('village-images', 'village-images', true);

-- Enable RLS on village_officials table
ALTER TABLE public.village_officials ENABLE ROW LEVEL SECURITY;

-- Create policies for village_officials
CREATE POLICY "Anyone can view active village officials" 
ON public.village_officials FOR SELECT 
USING (status = 'active');

CREATE POLICY "Admin can manage village officials" 
ON public.village_officials FOR ALL 
USING (true);

-- Create storage policies for public access to images
CREATE POLICY "Anyone can view images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'village-images');

CREATE POLICY "Anyone can upload images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'village-images');

CREATE POLICY "Anyone can update images" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'village-images');

CREATE POLICY "Anyone can delete images" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'village-images');

-- Insert sample village officials data
INSERT INTO public.village_officials (name, position, order_index) VALUES
('Bapak Suwito', 'Kepala Desa', 1),
('Ibu Siti Aminah', 'Sekretaris Desa', 2),
('Bapak Ahmad Yani', 'Bendahara Desa', 3),
('Ibu Kartini', 'Kaur Pemerintahan', 4),
('Bapak Sudarto', 'Kaur Pembangunan', 5),
('Ibu Sari Dewi', 'Kaur Kesejahteraan', 6),
('Bapak Wijaya', 'Kaur Umum', 7);
