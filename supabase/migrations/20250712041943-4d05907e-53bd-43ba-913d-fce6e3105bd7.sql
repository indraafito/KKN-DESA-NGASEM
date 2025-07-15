
-- Add columns to village_profile table for maps integration and welcome message
ALTER TABLE village_profile 
ADD COLUMN welcome_message text DEFAULT 'Selamat Datang di',
ADD COLUMN maps_url text,
ADD COLUMN latitude decimal(10,8),
ADD COLUMN longitude decimal(11,8);
