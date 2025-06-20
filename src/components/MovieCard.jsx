import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const {
    title,
    poster_path,
    release_date,
    original_language,
    vote_average,
    id,
  } = movie;

  return (
    <Link to={`/movie/${id}`} state={{ movie }}>
      <div className="movie-card">
        {poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt={title}
          />
        ) : (
          <img
            src="./poster_unavailable.png"
            alt={`${title} poster unavailable`}
          />
        )}
        <div className="mt-4">
          <h3>{title}</h3>
        </div>
        <div className="content">
          <div className="rating">
            <img src="/heart.svg" className="w-4 h-5" alt="heart icon" />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          </div>
          <span>•</span>
          <p className="lang">{original_language.toUpperCase()}</p>
          <span>•</span>
          <p className="year">
            {release_date ? release_date.split("-")[0] : "N/A"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
