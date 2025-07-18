
-- Create table for KKN programs
CREATE TABLE public.kkn_programs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  period TEXT NOT NULL,
  activities TEXT[], -- Array of activities
  participants INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
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

-- Create table for facilities
CREATE TABLE public.facilities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  features TEXT[], -- Array of features
  condition TEXT DEFAULT 'Baik', -- Baik, Cukup, Perlu Perbaikan
  icon TEXT, -- Emoji or icon identifier
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.kkn_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.facilities ENABLE ROW LEVEL SECURITY;

-- Create policies for KKN programs
CREATE POLICY "Admin can manage KKN programs" 
ON public.kkn_programs FOR ALL 
USING (true);

CREATE POLICY "Anyone can view active KKN programs" 
ON public.kkn_programs FOR SELECT 
USING (status = 'active');

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
