import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://pdvdjsccnvwidknzfwnf.supabase.co";
const supabaseKey = 'sb_publishable_vl5ckDcLpGXlkYBhUIWsBw_Gr6HYWjc'

export const supabase = createClient(supabaseUrl, supabaseKey)