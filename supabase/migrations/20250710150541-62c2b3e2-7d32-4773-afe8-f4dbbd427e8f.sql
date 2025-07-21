
-- Create table for KKN programs
CREATE TABLE public.kkn_programs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nama_proker TEXT NOT NULL,
  deskripsi TEXT NOT NULL,
  tanggal DATE NOT NULL,
  lokasi TEXT NOT NULL,
  photos TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for community programs
CREATE TABLE public.community_programs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  schedule TEXT NOT NULL,
  location TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Policy untuk INSERT
CREATE POLICY "Allow authenticated users to insert" ON kkn_programs
FOR INSERT TO authenticated
WITH CHECK (true);

-- Policy untuk SELECT
CREATE POLICY "Allow all to select" ON kkn_programs
FOR SELECT TO public
USING (true);

-- Policy untuk UPDATE  
CREATE POLICY "Allow authenticated users to update" ON kkn_programs
FOR UPDATE TO authenticated
USING (true) WITH CHECK (true);

-- Policy untuk DELETE
CREATE POLICY "Allow authenticated users to delete" ON kkn_programs
FOR DELETE TO authenticated
USING (true);

-- Enable RLS on all tables
ALTER TABLE public.kkn_programs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.facilities ENABLE ROW LEVEL SECURITY;


-- Create policies for community programs
CREATE POLICY "Admin can manage community programs" 
ON public.community_programs FOR ALL 
USING (true);

CREATE POLICY "Anyone can view active community programs" 
ON public.community_programs FOR SELECT 
USING (status = 'active');

-- Create policies for facilities
CREATE POLICY "Admin can manage facilities" 
ON public.facilities FOR ALL 
USING (true);

CREATE POLICY "Anyone can view active facilities" 
ON public.facilities FOR SELECT 
USING (status = 'active');
