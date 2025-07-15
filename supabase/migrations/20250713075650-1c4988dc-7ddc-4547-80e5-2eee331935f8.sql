
-- Create table for village statistics (population, RT/RW data)
CREATE TABLE public.village_statistics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  icon TEXT NULL,
  color_class TEXT NULL DEFAULT 'from-emerald-500 to-emerald-600',
  order_index INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for village achievements
CREATE TABLE public.village_achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NULL,
  image_url TEXT NULL,
  achievement_date DATE NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for village_statistics
ALTER TABLE public.village_statistics ENABLE ROW LEVEL SECURITY;

-- Create policies for village_statistics
CREATE POLICY "Anyone can view active village statistics" 
  ON public.village_statistics 
  FOR SELECT 
  USING (status = 'active');

CREATE POLICY "Admin can manage village statistics" 
  ON public.village_statistics 
  FOR ALL 
  USING (true);

-- Enable RLS for village_achievements
ALTER TABLE public.village_achievements ENABLE ROW LEVEL SECURITY;

-- Create policies for village_achievements
CREATE POLICY "Anyone can view active village achievements" 
  ON public.village_achievements 
  FOR SELECT 
  USING (status = 'active');

CREATE POLICY "Admin can manage village achievements" 
  ON public.village_achievements 
  FOR ALL 
  USING (true);

-- Insert default statistics data
INSERT INTO public.village_statistics (label, value, icon, color_class, order_index) VALUES
('Penduduk', '2,456', 'Users', 'from-emerald-500 to-emerald-600', 1),
('RT/RW', '12/4', 'MapPin', 'from-stone-500 to-stone-600', 2);

-- Add video_url field to village_profile table
ALTER TABLE public.village_profile ADD COLUMN video_url TEXT NULL;
