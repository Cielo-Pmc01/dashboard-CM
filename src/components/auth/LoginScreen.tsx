import { useState, type FormEvent } from 'react';
import { useAuthStore } from '@/store/auth';

export function LoginScreen() {
  const { signInWithPassword, signUp, error } = useAuthStore();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [signupDone, setSignupDone] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    if (mode === 'login') {
      await signInWithPassword(email, password);
    } else {
      await signUp(email, password);
      if (!useAuthStore.getState().error) setSignupDone(true);
    }
    setSubmitting(false);
  }

  return (
    <div className="login-shell">
      <div className="card login-card">
        <div className="brand login-brand">
          <div className="mark">S</div>
          <div>
            <strong>SYK Command</strong>
            <span>Content OS</span>
          </div>
        </div>

        {signupDone && mode === 'signup' ? (
          <div className="no-results">
            Cuenta creada. Revisá tu email para confirmar y después iniciá sesión.
          </div>
        ) : (
          <form className="login-form" onSubmit={handleSubmit}>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </label>
            <label>
              Contraseña
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />
            </label>

            {error && <div className="login-error">{error}</div>}

            <button type="submit" className="button primary" disabled={submitting}>
              {submitting ? 'Un momento…' : mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
            </button>
          </form>
        )}

        <button
          type="button"
          className="login-toggle"
          onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setSignupDone(false); }}
        >
          {mode === 'login' ? '¿No tenés cuenta? Creá una' : '¿Ya tenés cuenta? Iniciá sesión'}
        </button>
      </div>
    </div>
  );
}
