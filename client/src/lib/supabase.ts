import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function uploadImage(file: File, folder: 'destinations' | 'blog'): Promise<string> {
  const ext = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from('dream-travel-media')
    .upload(fileName, file, { upsert: false });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage
    .from('dream-travel-media')
    .getPublicUrl(fileName);

  return data.publicUrl;
}
