
-- Create table for service documents/applications
CREATE TABLE public.service_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID REFERENCES public.services(id) NOT NULL,
  applicant_name TEXT NOT NULL,
  applicant_email TEXT NOT NULL,
  applicant_phone TEXT NOT NULL,
  applicant_address TEXT,
  documents JSONB, -- Store array of document URLs and names
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  notes TEXT, -- Admin notes
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create storage bucket for service documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('service-documents', 'service-documents', false);

-- Enable RLS on service_applications
ALTER TABLE public.service_applications ENABLE ROW LEVEL SECURITY;

-- Create policies for service_applications
CREATE POLICY "Admin can manage all service applications" 
ON public.service_applications FOR ALL 
USING (true);

CREATE POLICY "Users can view their own applications" 
ON public.service_applications FOR SELECT 
USING (applicant_email = (current_setting('request.jwt.claims', true)::json->>'email'));

-- Create storage policies for service documents (private access)
CREATE POLICY "Admin can view all service documents" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'service-documents');

CREATE POLICY "Anyone can upload service documents" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'service-documents');

CREATE POLICY "Admin can manage service documents" 
ON storage.objects FOR ALL 
USING (bucket_id = 'service-documents');
