import { useState } from 'react';
import './PersonalCenter.css';

function PersonalCenter({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('favorites');
  const favorites = JSON.parse(localStorage.getItem('cineFavorites') || '[]');

  return (
    <div className="personal-overlay" onClick={onLogout}>
      <div className="personal-modal" onClick={(e) => e.stopPropagation()}>
        <button className="personal-close-btn" onClick={onLogout}>✕</button>

        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            {user?.username?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <h2 className="profile-name">{user?.username || '用户'}</h2>
          <p className="profile-role">电影爱好者</p>
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          <button
            className={`profile-tab ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            ❤️ 我的收藏
          </button>
          <button
            className={`profile-tab ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            📝 我的影评
          </button>
          <button
            className={`profile-tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ 设置
          </button>
        </div>

        {/* Tab Content */}
        <div className="profile-content">
          {activeTab === 'favorites' && (
            <div className="profile-section">
              {favorites.length > 0 ? (
                <p className="profile-empty">已收藏 {favorites.length} 部电影</p>
              ) : (
                <div className="profile-empty-state">
                  <span className="empty-icon">🎞️</span>
                  <p>还没有收藏电影</p>
                  <p className="empty-hint">浏览电影并点击收藏按钮</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="profile-section">
              <div className="profile-empty-state">
                <span className="empty-icon">✍️</span>
                <p>还没有写影评</p>
                <p className="empty-hint">看完电影来分享你的感受吧</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="profile-section">
              <div className="settings-list">
                <div className="settings-item">
                  <span>用户名</span>
                  <span className="settings-value">{user?.username || '用户'}</span>
                </div>
                <div className="settings-item">
                  <span>账号类型</span>
                  <span className="settings-value">普通用户</span>
                </div>
                <div className="settings-item">
                  <span>收藏数量</span>
                  <span className="settings-value">{favorites.length} 部</span>
                </div>
              </div>
              <button className="logout-btn" onClick={onLogout}>
                退出登录
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PersonalCenter;
