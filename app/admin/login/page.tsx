import Link from "next/link";
import { DEMO_PASSWORD, DEMO_USERNAME } from "@/lib/auth";
import { loginAction } from "./actions";

type LoginSearchParams = {
  error?: string;
  loggedout?: string;
  log?: string;
  redirect_to?: string;
};

export const metadata = {
  title: "Log In — FGM Resources Ghana Limited",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<LoginSearchParams>;
}) {
  const params = await searchParams;
  const hasError = params.error === "1";
  const loggedOut = params.loggedout === "1";
  const redirectTo =
    params.redirect_to?.startsWith("/admin") && !params.redirect_to.startsWith("/admin/login")
      ? params.redirect_to
      : "/admin";

  return (
    <div className="wp-login">
      <div className="wp-login-logo">
        <span className="wp-login-mark">⋀⋀</span>
        <span className="wp-login-wordmark">FGM</span>
      </div>

      <form className="wp-login-form" action={loginAction}>
        {hasError && (
          <div className="wp-login-notice is-error">
            <strong>Error:</strong> The username or password you entered is incorrect.
          </div>
        )}
        {loggedOut && !hasError && (
          <div className="wp-login-notice is-info">You are now logged out.</div>
        )}

        <label htmlFor="log">Username or Email Address</label>
        <input
          id="log"
          name="log"
          type="text"
          defaultValue={params.log ?? ""}
          autoComplete="username"
          autoFocus
          required
        />

        <label htmlFor="pwd">Password</label>
        <input
          id="pwd"
          name="pwd"
          type="password"
          autoComplete="current-password"
          required
        />

        <input type="hidden" name="redirect_to" value={redirectTo} />

        <label className="wp-login-remember">
          <input name="rememberme" type="checkbox" value="forever" />
          <span>Remember Me</span>
        </label>

        <button type="submit" className="wp-login-button">
          Log In
        </button>

        <p className="wp-login-lost">
          <Link href="/contact">Lost your password?</Link>
        </p>
      </form>

      <p className="wp-login-back">
        <Link href="/">← Go to FGM Resources Ghana Limited</Link>
      </p>

      <div className="wp-login-demo">
        <strong>Demo access</strong>
        <span>
          Username <code>{DEMO_USERNAME}</code> · Password <code>{DEMO_PASSWORD}</code>
        </span>
      </div>
    </div>
  );
}
