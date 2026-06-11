import { useState, useEffect } from 'react';
import './WelcomeScreen.css';

function WelcomeScreen({ onEnter }) {
  const [showContent, setShowContent] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowContent(true), 400);
    const t2 = setTimeout(() => setShowButton(true), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleEnter = () => {
    setExiting(true);
    setTimeout(() => onEnter(), 800);
  };

  return (
    <div className={`welcome-screen ${exiting ? 'exiting' : ''}`}>
      {/* Floating particles */}
      <div className="particles">
        {Array.from({ length: 50 }).map((_, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
              opacity: 0.3 + Math.random() * 0.5,
            }}
          />
        ))}
      </div>

      {/* Film strip decorations */}
      <div className="film-strip film-strip-top" />
      <div className="film-strip film-strip-bottom" />

      <div className="welcome-center">
        {/* Top accent line */}
        <div className={`welcome-accent ${showContent ? 'visible' : ''}`} />

        {/* Welcome text */}
        <p className={`welcome-greeting ${showContent ? 'visible' : ''}`}>
          欢迎来到
        </p>

        {/* Name - main title */}
        <h1 className={`welcome-name ${showContent ? 'visible' : ''}`}>
          <span className="name-char">Y</span>
          <span className="name-char">a</span>
          <span className="name-char">n</span>
          <span className="name-char">g</span>
          <span className="name-space"> </span>
          <span className="name-char">D</span>
          <span className="name-char">i</span>
          <span className="name-char">n</span>
          <span className="name-char">g</span>
          <span className="name-char">m</span>
          <span className="name-char">i</span>
          <span className="name-char">n</span>
          <span className="name-char">g</span>
        </h1>

        {/* Subtitle */}
        <div className={`welcome-subtitle-wrap ${showContent ? 'visible' : ''}`}>
          <span className="welcome-subtitle-decor">◆</span>
          <p className="welcome-subtitle">的电影推荐小网站</p>
          <span className="welcome-subtitle-decor">◆</span>
        </div>

        {/* Description */}
        <p className={`welcome-desc ${showContent ? 'visible' : ''}`}>
          探索 30 部精选佳片 · 发现你的下一部挚爱
        </p>

        {/* Enter button */}
        <button
          className={`welcome-btn ${showButton ? 'visible' : ''}`}
          onClick={handleEnter}
        >
          <span className="btn-text">进入网站</span>
          <span className="btn-arrow">→</span>
        </button>

        {/* Bottom hint */}
        <p className={`welcome-hint ${showButton ? 'visible' : ''}`}>
          点击按钮或按 Enter 键进入
        </p>
      </div>
    </div>
  );
}

export default WelcomeScreen;
