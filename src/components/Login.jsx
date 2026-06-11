import { useState } from 'react';
import './Login.css';

function Login({ onClose, onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('请填写所有字段');
      return;
    }

    if (isRegister && password !== confirmPassword) {
      setError('两次密码输入不一致');
      return;
    }

    if (password.length < 4) {
      setError('密码长度至少4位');
      return;
    }

    // Simple login/register simulation
    if (isRegister) {
      localStorage.setItem('cineUser', JSON.stringify({ username: username.trim() }));
      onLogin({ username: username.trim() });
    } else {
      const savedUser = localStorage.getItem('cineUser');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed.username === username.trim()) {
          onLogin({ username: username.trim() });
        } else {
          setError('用户名不存在');
        }
      } else {
        // First time: auto-register
        localStorage.setItem('cineUser', JSON.stringify({ username: username.trim() }));
        onLogin({ username: username.trim() });
      }
    }
  };

  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <button className="login-close-btn" onClick={onClose}>✕</button>

        <div className="login-header">
          <div className="login-icon">🎬</div>
          <h2 className="login-title">Dingming's Movie Cabin</h2>
          <p className="login-subtitle">
            {isRegister ? '创建你的专属账号' : '登录以解锁更多功能'}
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="form-label">用户名</label>
            <input
              type="text"
              className="form-input"
              placeholder="请输入用户名"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
          </div>

          <div className="form-field">
            <label className="form-label">密码</label>
            <input
              type="password"
              className="form-input"
              placeholder="请输入密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {isRegister && (
            <div className="form-field">
              <label className="form-label">确认密码</label>
              <input
                type="password"
                className="form-input"
                placeholder="请再次输入密码"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="login-submit-btn">
            {isRegister ? '注册' : '登录'}
          </button>
        </form>

        <p className="login-switch">
          {isRegister ? '已有账号？' : '还没有账号？'}
          <button
            className="switch-btn"
            onClick={() => { setIsRegister(!isRegister); setError(''); }}
          >
            {isRegister ? '去登录' : '去注册'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
