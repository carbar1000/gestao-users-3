import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// Funções CRUD básicas
export async function getUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('*')
  
  if (error) throw error
  return data
}

export async function createUser(userData) {
  const { data, error } = await supabase
    .from('users')
    .insert([userData])
  
  if (error) throw error
  return data
}

export async function updateUser(id, userData) {
  const { data, error } = await supabase
    .from('users')
    .update(userData)
    .eq('id', id)
  
  if (error) throw error
  return data
}

export async function deleteUser(id) {
  const { data, error } = await supabase
    .from('users')
    .delete()
    .eq('id', id)
  
  if (error) throw error
  return data
}
