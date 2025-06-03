import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const TABLE_NAME = 'metrics';

export const updateSearchCount = async (searchTerm, movie) => {
  try {
    // 1. Check if searchTerm exists
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('searchTerm', searchTerm)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = No rows found
      throw error;
    }

    if (data) {
      // 2. If it exists, increment the count
      await supabase
        .from(TABLE_NAME)
        .update({ count: data.count + 1 })
        .eq('movie_id', data.movie_id);
    } else {
      // 3. If it doesn't exist, insert a new row
      await supabase.from(TABLE_NAME).insert([
        {
          searchTerm,
          count: 1,
          movie_id: movie.id,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        },
      ]);
    }
  } catch (error) {
    console.error('Error updating search count:', error);
  }
};

export const getTrendingMovies = async () => {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .order('count', { ascending: false })
      .limit(10);

    // need this even though we have a catch  
    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};
