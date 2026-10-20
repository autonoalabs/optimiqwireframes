import Link from 'next/link';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-brand-panel" aria-label="OptimIQ Consultus">
        <Link className="login-brand" href="/" aria-label="Back to screen review hub">
          <img src={`${basePath}/OptimIQ_Short_logo.png`} alt="" />
          <span><strong>OptimIQ</strong><small>Consultus</small></span>
        </Link>
        <div className="login-brand-copy">
          <p className="eyebrow">One secure entry</p>
          <h1>Your OptimIQ workspace starts here.</h1>
          <p>Sign in once. Your workspace and available sections are based on your account type and assigned roles.</p>
        </div>
        <ul className="login-audience-list" aria-label="Portal account types">
          <li>Clients</li><li>Consultants</li><li>Consulting firms</li><li>OptimIQ staff</li>
        </ul>
      </section>

      <section className="login-form-panel" aria-labelledby="login-heading">
        <div className="login-form-wrap">
          <p className="eyebrow">Member portal</p>
          <h2 id="login-heading">Welcome back</h2>
          <p className="login-subtitle">Sign in to continue to your workspace.</p>
          <aside className="login-clarification" id="account-recovery"><strong>Before sign-in</strong><span>Your email is verified and your password is set during CTA registration. The account-recovery process still needs developer confirmation.</span></aside>

          <form className="login-form">
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" autoComplete="username" placeholder="name@company.com" />

            <div className="login-password-label"><label htmlFor="password">Password</label><a href="#account-recovery">Forgot password?</a></div>
            <input id="password" name="password" type="password" autoComplete="current-password" placeholder="Enter your password" />

            <button className="login-submit" type="button">Sign in</button>
          </form>
          <p className="login-prototype-note">Screen concept only · Sign-in is not connected.</p>

          <p className="login-registration">New to OptimIQ? <span>Start with the appropriate registration form on the public website. Email verification and password setup happen there, before portal sign-in.</span></p>
          <div className="login-role-note"><span className="login-role-note__icon" aria-hidden="true">↔</span><p><strong>Have more than one role?</strong><br />Switch between your permitted workspaces after signing in—no second login is needed.</p></div>
          <Link className="back-to-review" href="/">Back to screen review</Link>
        </div>
      </section>
    </main>
  );
}
