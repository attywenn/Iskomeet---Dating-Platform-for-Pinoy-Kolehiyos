import { useState } from "react"; 
import * as api from "../lib/api";
import { navigate } from "../lib/router";                                                                                 
import { useSession } from "../lib/session";

export function SignInPage() {
  const { refresh } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const user = api.signIn(username, password);
    if (!user) {
      setError("That account does not exist yet. Create one first.");
      return;
    }

    refresh();
    navigate({ name: "match" });
  }

  return (
    <div className="flex min-h-full items-center justify-center bg-slate-50 p-5">
      <div className="w-full max-w-sm rounded-[28px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50">
        <div className="mb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-600">
            Welcome back
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
            Log in
          </h1>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              Username
            </label>
            <input
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:bg-white"
              placeholder="yourname"
              autoComplete="username"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:bg-white"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          {error ? (
            <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-2xl bg-brand-500 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-brand-600"
          >
            Log in
          </button>
        </form>
        <div className="mt-5 text-center text-xs text-slate-500">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate({ name: "register" })}
            className="font-bold text-brand-600 underline-offset-2 hover:underline"
          >
            Register here 
          </button>
          <div className="flex justify-center items-center">
            <button
              type="button"
              onClick={() => navigate({ name: "landing"})}
              className="mt-2 text-xs text-brand-500 font-bold hover:underline"
            >
              Back to home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
