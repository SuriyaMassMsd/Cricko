import { motion, press } from "framer-motion";
import { useState } from "react";

motion;
const ScoreUi = () => {
  const [teamName, setTeamName] = useState("Kova Kight Riders");
  const [toss, setToss] = useState();
  const [chooseTo, setChooseTo] = useState(false);
  const [opponentName, setOpponentName] = useState("Kallpoondi Guys");
  const [score, setScore] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [overs, setOvers] = useState(0);
  const [balls, setBalls] = useState(0);
  const [target, setTarget] = useState(0);
  const [extraRuns, setExtraRuns] = useState(0);
  const [wideNoBye, setWideNoBye] = useState(false);
  const [extras, setExtras] = useState({
    wide: 0,
    noball: 0,
    byes: 0,
    legbyes: 0,
  });
  const [timeline, setTimeLine] = useState([]);

  const ballsTotal = overs * 6 + balls;
  const oversDisplay = `${overs}.${balls}`;
  const runsToWin = Math.max(target - score, 0);
  const required = runsToWin === 0 ? "Target Achieved" : `${runsToWin} runs`;

  const [batsmen, setBatsmen] = useState([
    {
      id: 1,
      name: "S. Kumar",
      runs: 0,
      balls: 0,
      strike: true,
      outOrNot: false,
    },
    {
      id: 2,
      name: "R. Iyer",
      runs: 0,
      balls: 0,
      strike: false,
      outOrNot: false,
    },
  ]);

  const [bowlers, setBowlers] = useState([
    { id: 1, name: "M. Patel", overs: "4.0", runs: 28, wickets: 1 },
    { id: 2, name: "J. Singh", overs: "4.0", runs: 32, wickets: 0 },
  ]);

  const tossWinBy = () => {
    setToss(teamName);
  };

  function addBallAndMaybeOver(extraBall = false) {
    if (extraBall) {
      return;
    }

    setOvers((prev) => {
      if (prev + 1 >= 6) {
        setOvers((o) => {
          return o + 1;
        });
        return 0;
      }
      return prev + 1;
    });
  }

  const addRuns = (runs) => {
    setScore((prev) => {
      setTimeLine((p) => [...p, runs]);
      return prev + runs;
    });
    setBalls((prev) => {
      if (prev + 1 >= 6) {
        setTimeLine((p) => [...p, "|"]);

        setBalls((o) => o);
        addBallAndMaybeOver(false);
        return 0;
      }
      return prev + 1;
    });

    setBatsmen((list) => {
      const newList = list.map((b) => {
        if (b.strike && b.outOrNot == false)
          return { ...b, runs: b.runs + runs, balls: b.balls + 1 };
        return b;
      });

      return newList;
    });

    if (balls === 5) {
      if (runs % 2 === 0) {
        setBatsmen((list) =>
          list.map((b) => (b.outOrNot ? b : { ...b, strike: !b.strike }))
        );
      }
    } else {
      if (runs % 2 === 1) {
        setBatsmen((list) =>
          list.map((b) => (b.outOrNot ? b : { ...b, strike: !b.strike }))
        );
      }
    }
  };

  const addExtra = (type) => {
    setWideNoBye(!wideNoBye);
    setExtras((ex) => {
      if (type === "wide") {
        setTimeLine((p) => [...p, "Wd"]);
      } else if (type === "noball") {
        setTimeLine((p) => [...p, "No"]);
      } else {
        setTimeLine((p) => [...p, "bys"]);
      }
      return { ...ex, [type]: ex[type] + 1 };
    });
  };

  const addWicket = () => {
    setWickets((w) => w + 1);
    addBallAndMaybeOver(false);
    setBatsmen((prevBastman) => {
      const updatedBastman = prevBastman.map((b) => {
        if (b.strike) {
          const { strike, ...rest } = b;
          return { ...rest, outOrNot: true };
        }
        return b;
      });
      return [
        ...updatedBastman,
        {
          id: Date.now(),
          name: "New batsman",
          balls: 0,
          strike: true,
          runs: 0,
          outOrNot: false,
        },
      ];
    });
  };

  const removeExtraOption = (run = 0) => {
    const runs = run + 1;
    setScore((prev) => {
      setTimeLine((p) => [...p, `+${run}`]);
      return prev + runs;
    });
    setWideNoBye(!wideNoBye);
  };

  const swapBatsMan = () => {
    setBatsmen((b) => {
      return b?.map((player) =>
        player?.outOrNot ? player : { ...player, strike: !player.strike }
      );
    });
  };

  return (
    <div className="bg-[radial-gradient(circle_at_top,_#0f172a)] text-slate-100 p-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3 ">
              <span className="p-2 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-xl shadow-lg">
                🏏
              </span>
              <span>
                Live Scoring — {teamName} vs {opponentName}
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-slate-400">Target</div>
              <div className="text-xl font-bold">180</div>
            </div>
            <button
              className="px-4 py-2 rounded-lg capitalize bg-white/6 backdrop-blur shadow-inner hover:bg-white/8 cursor-pointer transition-all
            ease-in-out duration-200"
            >
              Reset
            </button>
          </div>
        </header>

        <main className="grid grid-cols-12 gap-4">
          <section className="col-span-12 lg:col-span-6 bg-white/3 rounded-3xl p-6 backdrop-blur shadow-2xl ">
            <div className="flex justify-between items-center">
              <div className="flex justify-start items-center">
                <div>
                  <div className="text-sm text-slate-100">
                    Kova Kight Riders
                  </div>
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
                </div>
              </div>
              {target ? (
                <div className="p-4 rounded-2xl bg-gradient-to-b from-indigo-600/30 to-indigo-800/20 text-center">
                  <div className="text-xs text-slate-300">Opponent</div>
                  <div className="font-bold text-2xl mt-2">{opponentName}</div>
                  <div className="text-4xl font-extrabold mt-4">{target}</div>
                  <div className="text-sm text-slate-100 mt-1">runs to win</div>
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="flex justify-between mt-4 items-center ">
              {chooseTo ? (
                <div className="p-4 rounded-2xl shadow-2xl bg-gradient-to-b from-white/6 to-white/4 w-[120px] h-[120px]">
                  <h4 className="text-sm uppercase text-gray-300">Required</h4>
                  <h1 className="text-2xl font-extrabold tracking-tight mt-1">
                    {required}
                  </h1>
                  <h1 className="font-extrabold text-2xl ">runs</h1>
                </div>
              ) : (
                ""
              )}

              <div className="p-4 rounded-2xl shadow-2xl bg-gradient-to-b from-white/6 to-white/4 w-[120px] min-h-[120px]">
                <h4 className="text-sm uppercase text-gray-300">Extras</h4>
                <h1 className="text-2xl font-extrabold tracking-tight mt-1">
                  {extras.wide + extras.noball + extras.byes}
                </h1>
              </div>

              <div className="p-4 rounded-2xl shadow-2xl bg-gradient-to-b from-white/6 to-white/4 w-[120px] h-[120px]">
                <h4 className="text-sm uppercase text-gray-300">balls</h4>
                <h1 className="text-2xl font-extrabold tracking-tight mt-1">
                  {ballsTotal}
                </h1>
                <h1 className="font-extrabold text-2xl "></h1>
              </div>

              <div className="p-3 rounded-xl bg-white/5 text-center w-[120px] h-[120px]">
                <div className="text-xs text-slate-300">Extras breakdown</div>
                <div className="flex items-center justify-between mt-2 text-sm">
                  <span>Wide</span>
                  <span>{extras.wide}</span>
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
            <div className="mt-6">
              <h3 className="text-sm text-slate-300 mb-2">On Strike</h3>

              <div
                onClick={() => swapBatsMan()}
                className="mb-2 cursor-pointer"
              >
                Swap Bastman
              </div>

              <div className="flex flex-row items-center justify-start gap-2 mb-4 overflow-y-auto my-scroll">
                {timeline.map((t, i) => {
                  return (
                    <div
                      className="flex flex-row justify-start items-center"
                      key={i}
                    >
                      <span>{t}</span>
                    </div>
                  );
                })}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {batsmen.map((b) => (
                  <div
                    key={b.id}
                    className={`p-4 rounded-xl ${
                      b.strike
                        ? "bg-indigo-700/30 border border-indigo-400/20"
                        : "bg-white/3"
                    } `}
                  >
                    <div className="flex items-center justify-between relative">
                      <span className="absolute top-1 right-1">
                        {b.outOrNot && "Out"}
                      </span>
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
          </section>
          <aside className="col-span-12 lg:col-span-6 space-y-6">
            <div className="bg-white/4 rounded-3xl p-6 backdrop-blur shadow-2xl">
              <h2 className="text-lg font-bold mb-2">Controls</h2>

              <div className="grid grid-cols-3 gap-3">
                {wideNoBye
                  ? [0, 1, 2, 3, 4, 5, 6].map((run) => (
                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        key={run}
                        onClick={() => removeExtraOption(run)}
                        className="py-3 rounded-xl bg-gradient-to-r from-emerald-400/20 to-indigo-400/10 border border-white/6 shadow-inner font-bold u"
                      >
                        {run}
                      </motion.button>
                    ))
                  : [0, 1, 2, 3, 4, 5, 6].map((run) => (
                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        key={run}
                        onClick={() => addRuns(run)}
                        className="py-3 rounded-xl bg-gradient-to-r from-emerald-400/20 to-indigo-400/10 border border-white/6 shadow-inner font-bold u"
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
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white/5">
                  <div className="text-xs text-slate-300">Overs in hands</div>
                  <div className="text-xl font-bold">{overs - overs}</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5">
                  <div className="text-xs text-slate-300">Wickets in hands</div>
                  <div className="text-xl font-bold">{10 - wickets}</div>
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
              <div className="mt-2 text-xl font-bold">233 / 2 • 4</div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
};

export default ScoreUi;
