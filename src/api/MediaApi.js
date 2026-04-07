import axios from "axios";

const unsplashKey = import.meta.env.VITE_UNSPLASH_KEY;
const pexelsKey = import.meta.env.VITE_PEXELS_KEY;

export async function fetchPhotos(query, page = 1, per_page = 30) {
   try {
      if (!unsplashKey) {
         throw new Error('Missing Unsplash API key');
      }

      const res = await axios.get(
         "https://api.unsplash.com/search/photos",
         {
            params: { query, page, per_page },
            headers: {
               Authorization: `Client-ID ${unsplashKey}`,
            },
         }
      );

      return res.data.results;
   } catch (error) {
      console.error("Unsplash Error:", error.response?.data || error.message);
      const message = error.response?.data?.errors?.[0] || error.message || 'Unable to fetch photos';
      throw new Error(message);
   }
}

export async function FetchVideos(query, per_page = 32) {
   try {
      if (!pexelsKey) {
         throw new Error('Missing Pexels API key');
      }

      const resdata = await axios.get("https://api.pexels.com/videos/search", {
         params: { query, per_page },
         headers: {
            Authorization: pexelsKey,
         },
      });

      return resdata.data.videos;
   } catch (error) {
      console.error("pexels Error:", error.response?.data || error.message);
      const message = error.response?.data?.error || error.message || 'Unable to fetch videos';
      throw new Error(message);
   }
}