// supabase.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://vmxwtkehheypgqamvepy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZteHd0a2VoaGV5cGdxYW12ZXB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0MzEwMTEsImV4cCI6MjA2MTAwNzAxMX0.SDtJU1WflSHT7g-GOLUCj0X8YglPJA6CyudqXcJyM7I';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
