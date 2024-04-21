import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zhodltcbeokcvepgmgxb.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpob2RsdGNiZW9rY3ZlcGdtZ3hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM1NjYyMTQsImV4cCI6MjAyOTE0MjIxNH0.KjHztdR0VhwmokhDxZ-loTJfkCFj7jax4eBGMvDiVgg"
const supabase = createClient(supabaseUrl, supabaseKey)


// async function getCrews(){
//     const {data, error} = await supabase
//     .from("futbolhub")
//     .select()
//     if(error){
//       console.log('error', error)
//       return
//     }
//     console.log(data)
//   }

//  getCrews(); 

export default supabase;