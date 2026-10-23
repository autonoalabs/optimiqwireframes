const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-brand-panel" aria-label="OptimIQ Consultus">
        <div className="login-brand" aria-label="OptimIQ Consultus">
          <img src={`${basePath}/OptimIQ_Short_logo.png`} alt="OptimIQ symbol" />
          <span><strong>OptimIQ</strong><small>Consultus</small></span>
        </div>
      </section>

      <section className="login-form-panel" aria-labelledby="login-heading">
        <div className="login-form-wrap">
          <p className="eyebrow">Member portal</p>
          <h2 id="login-heading">Welcome back</h2>
          <p className="login-subtitle">Sign in to continue to your workspace.</p>
          <form className="login-form">
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" autoComplete="username" placeholder="name@company.com" />

            <div className="login-password-label"><label htmlFor="password">Password</label><a href="#reset-password">Forgot password?</a></div>
            <input id="password" name="password" type="password" autoComplete="current-password" placeholder="Enter your password" />

            <button className="login-submit" type="button">Sign in</button>
          </form>
        </div>
      </section>
    </main>
  );
}
