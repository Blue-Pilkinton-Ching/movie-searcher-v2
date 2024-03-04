export default function TMDBAuthHeader() {
  return {
    headers: { Authorization: `Bearer ${process.env.TMDB_KEY}` },
  }
}
