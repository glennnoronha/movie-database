import React from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: { accept: "application/json", Authorization: `Bearer ${API_KEY}` },
};

export default function MovieInfo() {
  const location = useLocation();
  const { movie } = location.state || {};
  const [genres, setGenres] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/genre/movie/list`,
          API_OPTIONS
        );
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    const fetchTrailer = async () => {
      if (!movie?.id) return;

      try {
        const response = await fetch(
          `${API_BASE_URL}/movie/${movie.id}/videos`,
          API_OPTIONS
        );
        const data = await response.json();

        // Find the first official trailer
        const officialTrailer = data.results?.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        setTrailer(officialTrailer);
      } catch (error) {
        console.error("Error fetching trailer:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchMovieDetails = async () => {
      if (!movie?.id) return;

      try {
        const response = await fetch(
          `${API_BASE_URL}/movie/${movie.id}`,
          API_OPTIONS
        );
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchGenres();
    fetchTrailer();
    fetchMovieDetails();
  }, [movie?.id]);

  if (!movie) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-primary text-white px-4">
        <h1 className="text-5xl font-bold mb-4">Movie Not Found</h1>
        <Link to="/">
          <button className="px-6 py-2 rounded-lg border border-white text-white hover:bg-white hover:text-[#0f0d23] transition cursor-pointer">
            Go back Home
          </button>
        </Link>
      </div>
    );
  }

  const {
    title,
    poster_path,
    vote_average,
    vote_count,
    overview,
    release_date,
    genre_ids,
    original_language,
    id,
  } = movie;

  // Get genre names from genre IDs
  const movieGenres = genre_ids
    ?.map((id) => genres.find((genre) => genre.id === id)?.name)
    .filter(Boolean);

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-0">
      <section className="w-full max-w-5xl rounded-lg border border-[#3282FFB3] bg-primary p-4 md:p-6 shadow-[0_0_15px_rgba(50,130,255,0.3)] md:my-12">
        {/* ===== Header row ===== */}
        <Link to="/" className="cursor-pointer">
          <button className="mb-4 px-4 py-2 rounded-lg bg-[#1b1735] text-[#3282FFB3] hover:bg-[#3282FFB3] hover:text-white transition-all duration-300 flex items-center gap-2 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Movies
          </button>
        </Link>
        <header className="mb-4 md:mb-6 flex flex-wrap items-center gap-4 mt-0">
          <h1 className="flex-1 text-2xl md:text-3xl font-bold text-left">
            {title}
          </h1>

          {/* rating box */}
          <div className="flex items-center gap-2 rounded-md bg-[#1b1735] px-3 py-1 text-sm">
            <span className="text-yellow-400">★</span>
            <span className="text-[#3282FFB3]">
              {vote_average?.toFixed(1) || "N/A"}/10
            </span>
            <span className="text-gray-400">
              ({vote_count?.toLocaleString() || 0})
            </span>
          </div>
        </header>

        {/* ===== Media row (poster + trailer) ===== */}
        <div className="mb-4 md:mb-6 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          {/* poster */}
          <div className="aspect-[2/3] w-full max-w-[200px] md:max-w-[240px] shrink-0 overflow-hidden rounded-lg bg-[#3282FFB3]">
            {poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src="./poster_unavailable.png"
                alt="Poster unavailable"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* trailer / hero image */}
          <div
            className={`relative overflow-hidden rounded-lg w-full max-w-[600px] h-[300px] md:h-[360px] ${
              !trailer ? "border border-[#3282FFB3]" : ""
            }`}
          >
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : trailer ? (
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=0&rel=0`}
                title={`${title} Trailer`}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                No trailer available
              </div>
            )}
          </div>
        </div>

        {/* ===== Meta list ===== */}
        <dl className="grid gap-y-3 md:gap-y-4 md:grid-cols-[120px_1fr] text-sm">
          {/* Genres */}
          <dt className="font-semibold text-gray-400">Genres</dt>
          <dd className="flex flex-wrap gap-2 text-[#3282FFB3]">
            {movieGenres?.map((genre) => (
              <span
                key={genre}
                className="rounded-md bg-[#1b1735] px-2 py-1 text-xs md:text-sm"
              >
                {genre}
              </span>
            ))}
          </dd>

          {/* Overview */}
          <dt className="font-semibold text-gray-400">Overview</dt>
          <dd className="text-[#3282FFB3] leading-relaxed line-clamp-3 md:line-clamp-none">
            {overview || "No overview available."}
          </dd>

          {/* Tagline */}
          {movieDetails?.tagline && (
            <>
              <dt className="font-semibold text-gray-400">Tagline</dt>
              <dd className="text-[#3282FFB3] italic">
                {movieDetails.tagline}
              </dd>
            </>
          )}

          {/* Release date */}
          <dt className="font-semibold text-gray-400">Release date</dt>
          <dd className="text-[#3282FFB3]">
            {release_date
              ? new Date(release_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Release date not available"}
          </dd>

          {/* Language */}
          <dt className="font-semibold text-gray-400">Language</dt>
          <dd className="text-[#3282FFB3]">
            {original_language?.toUpperCase() || "N/A"}
          </dd>

          {/* Budget */}
          <dt className="font-semibold text-gray-400">Budget</dt>
          <dd className="text-[#3282FFB3]">
            {formatCurrency(movieDetails?.budget)}
          </dd>

          {/* Revenue */}
          <dt className="font-semibold text-gray-400">Revenue</dt>
          <dd className="text-[#3282FFB3]">
            {formatCurrency(movieDetails?.revenue)}
          </dd>

          {/* Production Companies */}
          {movieDetails?.production_companies?.length > 0 && (
            <>
              <dt className="font-semibold text-gray-400">
                Production Companies
              </dt>
              <dd className="text-[#3282FFB3]">
                {movieDetails.production_companies.map((company, index) => (
                  <span key={company.id}>
                    {company.name}
                    {index < movieDetails.production_companies.length - 1
                      ? " • "
                      : ""}
                  </span>
                ))}
              </dd>
            </>
          )}
        </dl>
      </section>
    </div>
  );
}
