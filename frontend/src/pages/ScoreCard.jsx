import React, { useState } from "react";
import { motion } from "framer-motion";

export default function CricketScoringUI() {
  // Match / Team state
  const [teamName, setTeamName] = useState("Dragons");
  const [opponentName, setOpponentName] = useState("Titans");
  const [score, setScore] = useState(128);
  const [wickets, setWickets] = useState(3);
  const [overs, setOvers] = useState(19);
  const [balls, setBalls] = useState(2); // 19.2
  const [target, setTarget] = useState(180); // target to win
  const [extras, setExtras] = useState({
    wide: 2,
    noball: 0,
    byes: 1,
    legbyes: 0,
  });

  // Batsmen and bowlers
  const [batsmen, setBatsmen] = useState([
    { id: 1, name: "S. Kumar", runs: 64, balls: 54, strike: true },
    { id: 2, name: "R. Iyer", runs: 22, balls: 18, strike: false },
  ]);

  const [bowlers, setBowlers] = useState([
    { id: 1, name: "M. Patel", overs: "4.0", runs: 28, wickets: 1 },
    { id: 2, name: "J. Singh", overs: "4.0", runs: 32, wickets: 0 },
  ]);

  // Helper computed values
  const ballsTotal = overs * 6 + balls;
  const oversDisplay = `${overs}.${balls}`;
  const runsToWin = Math.max(target - score, 0);
  const required = runsToWin === 0 ? "Target Achieved" : `${runsToWin} runs`;

  // Utility: update balls and overs when runs or events happen
  function addBallAndMaybeOver(extraBall = false) {
    // extraBall means the ball doesn't count (wide/noball) -> do not increment balls
    if (extraBall) return; // do nothing to legal ball counters

    setBalls((prev) => {
      if (prev + 1 >= 6) {
        setOvers((o) => o + 1);
        return 0;
      }
      return prev + 1;
    });
  }

  function addRuns(runs = 1, options = { extra: false, wides: 0 }) {
    if (options.wides) {
      const wides = options.wides;
      setExtras((ex) => ({ ...ex, wide: ex.wide + wides }));
      setScore((s) => s + wides);
      return;
    }

    if (options.extra && runs === 1) {
      // a common case: no-ball with one free run
      setExtras((ex) => ({ ...ex, noball: ex.noball + 1 }));
      setScore((s) => s + runs);
      return; // ball not counted
    }

    // legal runs
    setScore((s) => s + runs);
    addBallAndMaybeOver(false);

    // attribute runs to striker
    setBatsmen((list) => {
      const newList = list.map((b) => {
        if (b.strike) return { ...b, runs: b.runs + runs, balls: b.balls + 1 };
        return b;
      });
      return newList;
    });

    // swap strike on odd runs
    if (runs % 2 === 1) {
      setBatsmen((list) => list.map((b) => ({ ...b, strike: !b.strike })));
    }
  }

  function addExtra(type) {
    setExtras((ex) => ({ ...ex, [type]: ex[type] + 1 }));
    setScore((s) => s + 1);
    // wides and noballs are not legal deliveries
    const noBallCounted = type === "wide" || type === "noball";
    if (!noBallCounted) {
      addBallAndMaybeOver(false);
    }
  }

  function addWicket() {
    setWickets((w) => w + 1);
    addBallAndMaybeOver(false);

    // rotate striker off and add placeholder batsman
    setBatsmen((list) => {
      const newBatsmen = list.map((b) => ({ ...b, strike: false }));
      newBatsmen.push({
        id: Date.now(),
        name: "New Batter",
        runs: 0,
        balls: 0,
        strike: true,
      });
      return newBatsmen;
    });
  }

  function undoRun(r) {
    setScore((s) => Math.max(0, s - r));
  }

  // Reset match helper
  function resetMatch() {
    setScore(0);
    setWickets(0);
    setOvers(0);
    setBalls(0);
    setExtras({ wide: 0, noball: 0, byes: 0, legbyes: 0 });
    setBatsmen([
      { id: 1, name: "S. Kumar", runs: 0, balls: 0, strike: true },
      { id: 2, name: "R. Iyer", runs: 0, balls: 0, strike: false },
    ]);
    setBowlers([
      { id: 1, name: "M. Patel", overs: "0.0", runs: 0, wickets: 0 },
    ]);
  }

  // Small UI helper components
  const StatCard = ({ title, value, className = "" }) => (
    <div
      className={`p-4 rounded-2xl shadow-2xl bg-gradient-to-br from-white/6 to-white/4 ${className}`}
    >
      <div className="text-sm uppercase text-gray-300">{title}</div>
      <div className="text-3xl font-extrabold tracking-tight mt-1">{value}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0f172a,_#001627)] text-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
              <span className="p-2 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-xl shadow-lg">
                🏏
              </span>
              <span>
                Live Scoring — {teamName} vs {opponentName}
              </span>
            </h1>
            <p className="text-sm text-slate-300 mt-1">
              Beautiful, fast, and reactive scoring UI for live matches
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-slate-400">Target</div>
              <div className="text-xl font-bold">{target}</div>
            </div>
            <button
              onClick={() => resetMatch()}
              className="px-4 py-2 rounded-lg bg-white/6 hover:bg-white/8 backdrop-blur shadow-inner"
            >
              Reset
            </button>
          </div>
        </header>

        <main className="grid grid-cols-12 gap-6">
          {/* Left: scoreboard big */}
          <section className="col-span-12 lg:col-span-6 bg-white/3 rounded-3xl p-6 backdrop-blur shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-300">{teamName}</div>
                <motion.div
                  initial={{ scale: 0.98 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-baseline gap-4"
                >
                  <div className="text-7xl font-extrabold tracking-tight">
                    {score}
                  </div>
                  <div className="text-3xl text-slate-300">/ {wickets}</div>
                </motion.div>
                <div className="text-sm text-slate-400 mt-2">
                  Overs: <span className="font-medium">{oversDisplay}</span>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <StatCard title="Required" value={required} />
                  <StatCard
                    title="Extras"
                    value={`${
                      extras.wide + extras.noball + extras.byes + extras.legbyes
                    }`}
                  />
                  <StatCard title="Balls" value={`${ballsTotal}`} />
                </div>

                <div className="mt-6">
                  <h3 className="text-sm text-slate-300 mb-2">On Strike</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {batsmen.map((b) => (
                      <div
                        key={b.id}
                        className={`p-4 rounded-xl ${
                          b.strike
                            ? "bg-indigo-700/30 border border-indigo-400/20"
                            : "bg-white/3"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold">{b.name}</div>
                            <div className="text-sm text-slate-300">
                              {b.runs} ({b.balls})
                            </div>
                          </div>
                          {b.strike && (
                            <div className="text-xs px-2 py-1 bg-amber-400/20 rounded-md">
                              Striker
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-44 ml-4">
                <div className="p-4 rounded-2xl bg-gradient-to-b from-indigo-600/30 to-indigo-800/20 text-center">
                  <div className="text-xs text-slate-300">Opponent</div>
                  <div className="text-2xl font-bold mt-2">{opponentName}</div>
                  <div className="text-4xl font-extrabold mt-4">
                    {Math.max(target - score, 0)}
                  </div>
                  <div className="text-sm text-slate-300 mt-1">runs to win</div>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-white/5 text-center">
                  <div className="text-xs text-slate-300">Extras breakdown</div>
                  <div className="flex items-center justify-between mt-2 text-sm">
                    <div>Wide</div>
                    <div>{extras.wide}</div>
                  </div>
                  <div className="flex items-center justify-between mt-1 text-sm">
                    <div>No ball</div>
                    <div>{extras.noball}</div>
                  </div>
                  <div className="flex items-center justify-between mt-1 text-sm">
                    <div>Byes</div>
                    <div>{extras.byes}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Right: Controls */}
          <aside className="col-span-12 lg:col-span-6 space-y-6">
            <div className="bg-white/4 rounded-3xl p-6 backdrop-blur shadow-2xl">
              <h2 className="text-lg font-bold">Controls</h2>
              <p className="text-sm text-slate-300 mb-4">
                Tap the buttons to update score. UI is built for touch and
                keyboard.
              </p>

              <div className="grid grid-cols-3 gap-3">
                {[0, 1, 2, 3, 4, 5, 6].map((run) => (
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    key={run}
                    onClick={() => addRuns(run)}
                    className="py-3 rounded-xl bg-gradient-to-r from-emerald-400/20 to-indigo-400/10 border border-white/6 shadow-inner font-bold"
                  >
                    {run}
                  </motion.button>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                <button
                  onClick={() => addExtra("wide")}
                  className="py-3 rounded-xl bg-yellow-400/10 border border-yellow-300/10"
                >
                  Wide
                </button>
                <button
                  onClick={() => addExtra("noball")}
                  className="py-3 rounded-xl bg-pink-400/10 border border-pink-300/10"
                >
                  No ball
                </button>
                <button
                  onClick={() => addExtra("byes")}
                  className="py-3 rounded-xl bg-sky-400/10 border border-sky-300/10"
                >
                  Byes
                </button>
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => addWicket()}
                  className="flex-1 py-3 rounded-xl bg-red-500/10 border border-red-400/10"
                >
                  Wicket
                </button>
                <button
                  onClick={() => addRuns(1, { extra: true })}
                  className="py-3 px-4 rounded-xl bg-amber-400/10 border border-amber-300/10"
                >
                  N.B +1
                </button>
                <button
                  onClick={() => addRuns(1, { wides: 1 })}
                  className="py-3 px-4 rounded-xl bg-emerald-400/10 border border-emerald-300/10"
                >
                  Wide x1
                </button>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white/5">
                  <div className="text-xs text-slate-300">Overs</div>
                  <div className="text-xl font-bold">{oversDisplay}</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5">
                  <div className="text-xs text-slate-300">Wickets</div>
                  <div className="text-xl font-bold">{wickets}</div>
                </div>
              </div>
            </div>

            {/* Bowlers + Scoreboard history */}
            <div className="bg-white/3 rounded-3xl p-6 backdrop-blur shadow-2xl">
              <h3 className="text-lg font-bold mb-3">Bowlers</h3>
              <div className="grid grid-cols-1 gap-3">
                {bowlers.map((b) => (
                  <div
                    key={b.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5"
                  >
                    <div>
                      <div className="font-medium">{b.name}</div>
                      <div className="text-sm text-slate-300">
                        {b.overs} overs • {b.wickets} wkts
                      </div>
                    </div>
                    <div className="text-lg font-bold">{b.runs}</div>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold mt-6 mb-3">Match events</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/4">
                  <div className="text-sm">Last ball: 1</div>
                  <div className="text-xs text-slate-300">by S. Kumar</div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/4">
                  <div className="text-sm">Previous: Wide</div>
                  <div className="text-xs text-slate-300">extra</div>
                </div>
              </div>
            </div>

            {/* Footer small stats */}
            <div className="bg-gradient-to-r from-indigo-900/30 to-pink-900/10 rounded-3xl p-6 text-center">
              <div className="text-sm text-slate-300">
                Live view • Updated instantly
              </div>
              <div className="mt-2 text-xl font-bold">
                {score} / {wickets} • {oversDisplay}
              </div>
            </div>
          </aside>
        </main>

        <footer className="mt-8 text-center text-slate-400 text-sm">
          Tip: This UI is intentionally modular — plug this component into your
          app and connect the handlers to backend sockets or REST endpoints for
          real-time syncing.
        </footer>
      </div>
    </div>
  );
}
