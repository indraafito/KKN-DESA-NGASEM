
-- Add columns to village_profile table for maps integration and welcome message
ALTER TABLE village_profile 
ADD COLUMN welcome_message text DEFAULT 'Selamat Datang di',
ADD COLUMN maps_url text;
