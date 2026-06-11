import { useState, useMemo, useEffect, useCallback } from 'react';
import CircularGallery from './components/CircularGallery/CircularGallery';
import WelcomeScreen from './components/WelcomeScreen';
import MovieDetail from './components/MovieDetail';
import Login from './components/Login';
import PersonalCenter from './components/PersonalCenter';
import MOVIES from './data/movies';
import './App.css';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showPersonal, setShowPersonal] = useState(false);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('cineFavorites') || '[]');
  });

  const handleEnter = useCallback(() => {
    setShowWelcome(false);
  }, []);

  // Keyboard Enter support
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Enter' && showWelcome) {
        handleEnter();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showWelcome, handleEnter]);

  // Check if user is already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('cineUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        // Ignore
      }
    }
  }, []);

  // Rating sorted movies
  const ratingSortedMovies = useMemo(() => {
    return [...MOVIES].sort((a, b) => b.rating - a.rating);
  }, []);

  const galleryItems = useMemo(() => {
    return MOVIES.map(m => ({
      image: m.image,
      text: m.title,
    }));
  }, []);

  // Open movie detail
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedMovie(null);
  };

  // Login flow
  const handleOpenLogin = () => {
    if (user) {
      setShowPersonal(true);
    } else {
      setShowLogin(true);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('cineUser');
    setUser(null);
    setShowPersonal(false);
  };

  // Favorites
  const toggleFavorite = (movieId) => {
    let newFavorites;
    if (favorites.includes(movieId)) {
      newFavorites = favorites.filter(id => id !== movieId);
    } else {
      newFavorites = [...favorites, movieId];
    }
    setFavorites(newFavorites);
    localStorage.setItem('cineFavorites', JSON.stringify(newFavorites));
  };

  return (
    <>
      {showWelcome && <WelcomeScreen onEnter={handleEnter} />}

      <div className={`app ${showWelcome ? 'app-hidden' : 'app-visible'}`}>
        {/* Hero Header */}
        <header className="hero">
          <div className="hero-overlay" />
          <nav className="navbar">
            <div className="nav-brand">
              <span className="brand-icon">🎬</span>
              <span className="brand-text">Dingming's</span>
              <span className="brand-accent">Movie Cabin</span>
            </div>
            <div className="nav-links">
              <button
                className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
                onClick={() => setCurrentPage('home')}
              >
                发现
              </button>
              <button
                className={`nav-link ${currentPage === 'ranking' ? 'active' : ''}`}
                onClick={() => setCurrentPage('ranking')}
              >
                评分排行
              </button>
              <button className="nav-link nav-btn" onClick={handleOpenLogin}>
                {user ? `👤 ${user.username}` : '个人中心'}
              </button>
            </div>
          </nav>

          <div className="hero-content">
            <h1 className="hero-title">
              <span className="title-line">探索光影世界</span>
              <span className="title-line accent">发现你的下一部挚爱</span>
            </h1>
            <p className="hero-subtitle">
              Dingming's Movie Cabin · 从经典巨作到当代佳作
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">{MOVIES.length}+</span>
                <span className="stat-label">精选影片</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <span className="stat-number">
                  {new Set(MOVIES.flatMap(m => m.genre)).size}+
                </span>
                <span className="stat-label">风格类型</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <span className="stat-number">∞</span>
                <span className="stat-label">无限灵感</span>
              </div>
            </div>
          </div>
        </header>

        {/* Home Page: Gallery + Featured Grid */}
        {currentPage === 'home' && (
          <>
            <section id="gallery" className="gallery-section">
              <div className="section-header">
                <h2 className="section-title">
                  <span className="title-decoration" />
                  滑动探索影片
                </h2>
                <p className="section-desc">拖拽或滚轮浏览 · 点击下方卡片查看详情</p>
              </div>
              <div className="gallery-container">
                <CircularGallery
                  items={galleryItems}
                  bend={3}
                  textColor="#ffffff"
                  borderRadius={0.08}
                  scrollSpeed={2}
                  scrollEase={0.05}
                  font="bold 34px 'Noto Sans SC'"
                  fontUrl="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700;900&display=swap"
                />
              </div>
            </section>

            <section id="featured" className="featured-section">
              <div className="section-header">
                <h2 className="section-title">
                  <span className="title-decoration" />
                  全部影片 · {MOVIES.length} 部
                </h2>
                <p className="section-desc">点击卡片查看电影详情</p>
              </div>
              <div className="featured-grid">
                {MOVIES.map(movie => (
                  <div
                    key={movie.id}
                    className="movie-card"
                    onClick={() => handleMovieClick(movie)}
                  >
                    <div className="movie-poster">
                      <img src={movie.image} alt={movie.title} loading="lazy" />
                      <div className="movie-rating">
                        <span className="rating-star">★</span>
                        <span className="rating-value">{movie.rating}</span>
                      </div>
                      <button
                        className={`card-fav-btn ${favorites.includes(movie.id) ? 'favorited' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!user) {
                            setShowLogin(true);
                          } else {
                            toggleFavorite(movie.id);
                          }
                        }}
                        title={favorites.includes(movie.id) ? '取消收藏' : '添加收藏'}
                      >
                        {favorites.includes(movie.id) ? '❤️' : '🤍'}
                      </button>
                    </div>
                    <div className="movie-info">
                      <h3 className="movie-title">{movie.title}</h3>
                      <p className="movie-title-en">{movie.titleEn}</p>
                      <div className="movie-meta">
                        <span className="movie-year">{movie.year}</span>
                        <span className="meta-dot">·</span>
                        <span className="movie-director">{movie.director}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Rating Ranking Page */}
        {currentPage === 'ranking' && (
          <section id="ranking" className="ranking-section">
            <div className="section-header">
              <h2 className="section-title">
                <span className="title-decoration" />
                评分排行 · TOP {ratingSortedMovies.length}
              </h2>
              <p className="section-desc">按豆瓣评分从高到低排列</p>
            </div>

            <div className="ranking-list">
              {ratingSortedMovies.map((movie, index) => (
                <div
                  key={movie.id}
                  className={`ranking-item ${index < 3 ? 'top-three' : ''}`}
                  onClick={() => handleMovieClick(movie)}
                >
                  <div className={`ranking-number ${index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : ''}`}>
                    {index < 3 ? ['🥇', '🥈', '🥉'][index] : index + 1}
                  </div>
                  <div className="ranking-poster">
                    <img src={movie.image} alt={movie.title} loading="lazy" />
                  </div>
                  <div className="ranking-info">
                    <h3 className="ranking-title">{movie.title}</h3>
                    <p className="ranking-meta">
                      {movie.year} · {movie.director}
                    </p>
                    <div className="ranking-genres">
                      {movie.genre.map(g => (
                        <span key={g} className="ranking-genre">{g}</span>
                      ))}
                    </div>
                  </div>
                  <div className="ranking-score-wrap">
                    <span className="ranking-star">★</span>
                    <span className="ranking-score">{movie.rating}</span>
                  </div>
                  <button
                    className={`fav-btn ${favorites.includes(movie.id) ? 'favorited' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!user) {
                        setShowLogin(true);
                      } else {
                        toggleFavorite(movie.id);
                      }
                    }}
                    title={favorites.includes(movie.id) ? '取消收藏' : '添加收藏'}
                  >
                    {favorites.includes(movie.id) ? '❤️' : '🤍'}
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-brand">
              <span className="brand-icon">🎬</span>
              <span className="brand-text">Dingming's</span>
              <span className="brand-accent">Movie Cabin</span>
            </div>
            <p className="footer-tagline">Yang Dingming · 好电影，值得被更多人看见</p>
            <p className="footer-copy">© 2026 Dingming's Movie Cabin · 用心推荐每一部电影</p>
          </div>
        </footer>
      </div>

      {/* Movie Detail Modal */}
      {showDetail && (
        <MovieDetail movie={selectedMovie} onClose={handleCloseDetail} />
      )}

      {/* Login Modal */}
      {showLogin && (
        <Login onClose={() => setShowLogin(false)} onLogin={handleLogin} />
      )}

      {/* Personal Center Modal */}
      {showPersonal && (
        <PersonalCenter user={user} onLogout={handleLogout} />
      )}
    </>
  );
}

export default App;
