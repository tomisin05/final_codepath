import { createClient } from '@supabase/supabase-js'

const URL = 'https://gqpigiwikfsqogwsrrix.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxcGlnaXdpa2ZzcW9nd3Nycml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA4MzcxNTUsImV4cCI6MjA0NjQxMzE1NX0.QiU8FW-mpnmDHnoBQJFt1O2_tGNKXBMZAA4UnWooROg';

export const supabase = createClient (URL, API_KEY) ;