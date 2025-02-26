import { createClient } from '@supabase/supabase-js';

// Acesse as variáveis de ambiente
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // Defina a variável no Vercel
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY; // Defina a variável no Vercel


const supabase = createClient(supabaseUrl, supabaseKey);

// Exporte a variável supabase
export { supabase };
