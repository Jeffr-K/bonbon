import { createClient } from '@supabase/supabase-js'


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URLl
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL 또는 API key가 설정되지 않았습니다.')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase