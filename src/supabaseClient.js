import { createClient } from '@supabase/supabase-js';

// Acesse as variáveis de ambiente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // Defina a variável no Vercel
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Defina a variável no Vercel

// Exporte a variável supabase
export { supabase };


const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
