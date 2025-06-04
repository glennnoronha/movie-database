import React from "react";
import { Link } from "react-router-dom";

export default function MovieInfo() {
  // later you’ll fetch real data; for now just build the frame
  return (
    <section className="mx-auto my-10 max-w-5xl rounded-lg border border-blue-600 bg-primary p-6 text-light-100">
      {/* ===== Header row ===== */}
      <header className="mb-6 flex flex-wrap items-center gap-4">
        <h1 className="flex-1 text-3xl font-bold">Squid Game 2</h1>



        {/* rating box */}
        <div className="flex items-center gap-2 rounded-md bg-[#1b1735] px-3 py-1 text-sm">
          <span className="text-yellow-400">★</span>
          <span>8.9/10</span>
          <span className="text-gray-400">(200K)</span>
        </div>

      </header>

      {/* ===== Media row (poster + trailer) ===== */}
      <div className="mb-6 flex flex-col gap-6 md:flex-row">
        {/* poster */}
        <div className="aspect-[2/3] w-full max-w-[180px] shrink-0 overflow-hidden rounded-lg bg-[#1b1735]" />

        {/* trailer / hero image */}
        <div className="relative flex-1 overflow-hidden rounded-lg bg-[#1b1735]">
          {/* fake “play” overlay */}
          <button className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 backdrop-blur">
            ▶
          </button>
        </div>
      </div>

      {/* ===== Meta list ===== */}
      <dl className="grid gap-y-4 md:grid-cols-[140px_1fr]">
        {/* Genres */}
        <dt className="font-semibold text-gray-400">Genres</dt>
        <dd className="flex flex-wrap gap-2">
          {["Adventure", "Action", "Drama"].map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-[#1b1735] px-3 py-1 text-sm"
            >
              {tag}
            </span>
          ))}
        </dd>

        {/* Overview */}
        <dt className="font-semibold text-gray-400">Overview</dt>
        <dd className="max-w-prose text-sm leading-relaxed">
          Hundreds of cash-strapped players accept a strange invitation to
          compete in children’s games. Inside, a tempting prize awaits with
          deadly high stakes…
        </dd>

        {/* Release date */}
        <dt className="font-semibold text-gray-400">Release date</dt>
        <dd className="text-sm">December 26, 2024 (Worldwide)</dd>

        {/* Countries */}
        <dt className="font-semibold text-gray-400">Countries</dt>
        <dd className="flex flex-wrap gap-2 text-sm">
          {[
            "United States",
            "Canada",
            "UAE",
            "Hungary",
            "Italy",
            "New Zealand",
          ].map((c) => (
            <span key={c}>{c}</span>
          ))}
        </dd>

        {/* Status */}
        <dt className="font-semibold text-gray-400">Status</dt>
        <dd className="text-sm">Released</dd>

        {/* Language */}
        <dt className="font-semibold text-gray-400">Language</dt>
        <dd className="text-sm">
          English • Korean • Hindi • Arabic • German • Spanish
        </dd>

        {/* Budget */}
        <dt className="font-semibold text-gray-400">Budget</dt>
        <dd className="text-sm">$21.4 million</dd>

        {/* Revenue */}
        <dt className="font-semibold text-gray-400">Revenue</dt>
        <dd className="text-sm">$900 million</dd>

        {/* Tagline */}
        <dt className="font-semibold text-gray-400">Tagline</dt>
        <dd className="text-sm">45.6 Billion Won is Child’s Play</dd>

        {/* Production companies */}
        <dt className="font-semibold text-gray-400">Production Companies</dt>
        <dd className="flex flex-wrap gap-2 text-sm">
          {[
            "Legendary Entertainment",
            "Warner Bros. Entertainment",
            "Villeneuve Films",
          ].map((pc) => (
            <span key={pc}>{pc}</span>
          ))}
        </dd>
      </dl>

      {/* ===== Visit link ===== */}
      <Link to="/">
              <button className="px-6 py-2 rounded-lg border border-white text-white hover:bg-white hover:text-[#0f0d23] transition cursor-pointer">
                Go back Home
              </button>
            </Link>
    </section>
  );
}
