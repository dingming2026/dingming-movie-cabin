import { useEffect } from 'react';
import './MovieDetail.css';

function MovieDetail({ movie, onClose }) {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!movie) return null;

  return (
    <div className="movie-detail-overlay" onClick={onClose}>
      <div className="movie-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="detail-close-btn" onClick={onClose}>
          <span>✕</span>
        </button>

        <div className="detail-layout">
          {/* Poster */}
          <div className="detail-poster-wrap">
            <img src={movie.image} alt={movie.title} className="detail-poster" />
            <div className="detail-rating-badge">
              <span className="rating-star-lg">★</span>
              <span className="rating-value-lg">{movie.rating}</span>
            </div>
          </div>

          {/* Info */}
          <div className="detail-info">
            <h2 className="detail-title">{movie.title}</h2>
            <p className="detail-title-en">{movie.titleEn}</p>

            <div className="detail-meta">
              <span className="detail-year">{movie.year}</span>
              <span className="detail-dot">·</span>
              <span className="detail-director">{movie.director}</span>
            </div>

            <div className="detail-genres">
              {movie.genre.map((g) => (
                <span key={g} className="detail-genre-tag">{g}</span>
              ))}
            </div>

            <div className="detail-divider" />

            <p className="detail-desc">{movie.description}</p>

            <div className="detail-stats">
              <div className="detail-stat">
                <span className="detail-stat-value">{movie.rating}</span>
                <span className="detail-stat-label">豆瓣评分</span>
              </div>
              <div className="detail-stat">
                <span className="detail-stat-value">{movie.year}</span>
                <span className="detail-stat-label">上映年份</span>
              </div>
              <div className="detail-stat">
                <span className="detail-stat-value">{movie.genre.length}</span>
                <span className="detail-stat-label">风格类型</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
