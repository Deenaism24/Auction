import React, { useState } from 'react';
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Добавить авторизацию
    console.log('Логин:', email, password);
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.title}>Авторизация</h2>
      <p className={styles.description}>
        Войдите в свою учетную запись, чтобы делать ставки и регистрироваться для участия в
        продажах.
      </p>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Электронная почта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
        />
        <div className={styles.forgotPassword}>
          <button type="button" className={styles.linkButton}>
            Забыли пароль?
          </button>
        </div>
        <button type="submit" className={styles.loginButton}>
          Войти
        </button>
        <button type="button" className={styles.createAccountButton}>
          Создать аккаунт
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
