"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore, hasPersistedState } from "@/lib/store";
import { t, trailName } from "@/lib/i18n";
import LanguageSelect from "@/components/LanguageSelect";
import BuyMeACoffeeButton from "@/components/BuyMeACoffeeButton";
import type { Exercise, Language, Trail } from "@/lib/types";

type Status = "completed" | "current" | "locked";

const TRAIL_ORDER: Trail[] = ["zero", "intermediate", "advanced"];

const TRAIL_STYLES: Record<
  Trail,
  { line: string; card: string; badge: string; heading: string }
> = {
  zero: {
    line: "bg-emerald-800",
    card: "border-emerald-900 bg-emerald-950/40 hover:bg-emerald-950/70",
    badge: "bg-emerald-900 text-emerald-300",
    heading: "text-emerald-400",
  },
  intermediate: {
    line: "bg-amber-800",
    card: "border-amber-900 bg-amber-950/40 hover:bg-amber-950/70",
    badge: "bg-amber-900 text-amber-300",
    heading: "text-amber-400",
  },
  advanced: {
    line: "bg-red-800",
    card: "border-red-900 bg-red-950/40 hover:bg-red-950/70",
    badge: "bg-red-900 text-red-300",
    heading: "text-red-400",
  },
};

const STATUS_STYLES: Record<Status, { emoji: string; dot: string }> = {
  completed: { emoji: "✅", dot: "bg-emerald-700" },
  current: { emoji: "🔵", dot: "bg-blue-700" },
  locked: { emoji: "⚪", dot: "bg-gray-800" },
};

interface Props {
  allExercises: Exercise[];
}

export default function RoadmapClient({ allExercises }: Props) {
  const router = useRouter();
  const progress = useStore((state) => state.progress);
  const lang = useStore((state) => state.lang);
  const isCompleted = useStore((state) => state.actions.isCompleted);
  const setLanguage = useStore((state) => state.actions.setLanguage);
  const resetProgress = useStore((state) => state.actions.resetProgress);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!hasPersistedState()) {
      router.replace("/");
      return;
    }
    setMounted(true);
  }, [router]);

  function handleLangChange(next: Language) {
    setLanguage(next);
  }

  function handleReset() {
    const confirmed = window.confirm(t(lang, "resetConfirm"));
    if (!confirmed) return;
    resetProgress();
    router.push("/");
  }

  if (!mounted) return null;

  function getStatus(exercise: Exercise): Status {
    if (isCompleted(exercise.id)) return "completed";
    if (exercise.id === progress.currentId) return "current";
    return "locked";
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <span className="text-lg font-bold">NodeJS Katas</span>

        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="text-sm text-gray-400 hover:text-white"
          >
            {t(lang, "stats")}
          </button>

          <LanguageSelect value={lang} onChange={handleLangChange} />

          <BuyMeACoffeeButton />
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-6 py-10 space-y-12">
        {TRAIL_ORDER.map((trail) => {
          const exercises = allExercises
            .filter((e) => e.trail === trail)
            .sort((a, b) => a.order - b.order);

          if (exercises.length === 0) return null;

          const styles = TRAIL_STYLES[trail];

          return (
            <div key={trail}>
              <h2
                className={`text-sm font-semibold uppercase tracking-widest mb-6 ${styles.heading}`}
              >
                {trailName(lang, trail)}
              </h2>

              <ul className="relative space-y-4">
                <div
                  aria-hidden
                  className={`absolute left-4 top-2 bottom-2 w-0.5 ${styles.line}`}
                />

                {exercises.map((exercise) => {
                  const status = getStatus(exercise);
                  const statusStyle = STATUS_STYLES[status];
                  const locked = status === "locked";

                  return (
                    <li key={exercise.id} className="relative pl-12">
                      <span
                        className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${statusStyle.dot}`}
                      >
                        {statusStyle.emoji}
                      </span>

                      <button
                        onClick={() => router.push(`/exercise/${exercise.id}`)}
                        className={[
                          "w-full text-left flex items-center gap-3 rounded-lg border px-4 py-3",
                          styles.card,
                          locked ? "opacity-50" : "",
                        ].join(" ")}
                      >
                        <span className="text-xs text-gray-500 shrink-0 font-mono">
                          #{exercise.order}
                        </span>
                        <span className="flex-1 min-w-0 truncate font-medium">
                          {exercise.title[lang]}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${styles.badge}`}
                        >
                          {trailName(lang, exercise.trail)}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </section>

      <div className="max-w-3xl mx-auto px-6 pb-10 flex justify-center">
        <button
          onClick={handleReset}
          className="text-xs text-red-700 border border-red-900 rounded-md px-2 py-1 opacity-70 hover:opacity-100 hover:bg-red-50 hover:text-red-700 transition-colors"
        >
          {t(lang, "resetButton")}
        </button>
      </div>
    </main>
  );
}
