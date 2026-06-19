"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore, hasPersistedState } from "@/lib/store";
import {
  t,
  trailName,
  completedCount as formatCompletedCount,
  motivationalMessage,
} from "@/lib/i18n";
import BuyMeACoffeeButton from "@/components/BuyMeACoffeeButton";
import type { Exercise, Trail } from "@/lib/types";

interface Props {
  allExercises: Exercise[];
}

const TRAIL_ORDER: Trail[] = ["zero", "intermediate", "advanced"];

const TRAIL_STYLES: Record<
  Trail,
  { bar: string; heading: string; border: string; bg: string }
> = {
  zero: {
    bar: "bg-emerald-500",
    heading: "text-emerald-400",
    border: "border-emerald-900",
    bg: "bg-emerald-950/30",
  },
  intermediate: {
    bar: "bg-amber-500",
    heading: "text-amber-400",
    border: "border-amber-900",
    bg: "bg-amber-950/30",
  },
  advanced: {
    bar: "bg-red-500",
    heading: "text-red-400",
    border: "border-red-900",
    bg: "bg-red-950/30",
  },
};

export default function DashboardClient({ allExercises }: Props) {
  const router = useRouter();
  const lang = useStore((state) => state.lang);
  const isCompleted = useStore((state) => state.actions.isCompleted);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!hasPersistedState()) {
      router.replace("/");
      return;
    }
    setMounted(true);
  }, [router]);

  if (!mounted) return null;

  const totalExercises = allExercises.length;
  const totalCompleted = allExercises.filter((e) => isCompleted(e.id)).length;
  const overallPercentage =
    totalExercises > 0
      ? Math.round((totalCompleted / totalExercises) * 100)
      : 0;

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => router.push("/roadmap")}
          className="text-sm text-gray-400 hover:text-white"
        >
          ← {t(lang, "back")}
        </button>
        <div className="h-4 w-px bg-gray-700" />
        <span className="text-lg font-bold">{t(lang, "statsTitle")}</span>
        <div className="ml-auto flex items-center gap-3">
          <BuyMeACoffeeButton />
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-10">
        <div className="rounded-xl border border-gray-800 bg-gray-900 px-6 py-6 mb-10">
          <p className="text-sm text-gray-400 mb-1">
            {formatCompletedCount(lang, totalCompleted, totalExercises)}
          </p>
          <p className="text-base font-semibold text-emerald-400 mb-4">
            {motivationalMessage(lang, overallPercentage)}
          </p>

          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{t(lang, "progress")}</span>
            <span>{overallPercentage}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-3">
            <div
              className="bg-emerald-500 h-3 rounded-full transition-all"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TRAIL_ORDER.map((trail) => {
            const styles = TRAIL_STYLES[trail];
            const trailExercises = allExercises
              .filter((e) => e.trail === trail)
              .sort((a, b) => a.order - b.order);
            const trailCompleted = trailExercises.filter((e) =>
              isCompleted(e.id),
            ).length;
            const trailPercentage =
              trailExercises.length > 0
                ? Math.round((trailCompleted / trailExercises.length) * 100)
                : 0;

            return (
              <div
                key={trail}
                className={`rounded-xl border ${styles.border} ${styles.bg} px-5 py-5`}
              >
                <h2
                  className={`text-sm font-semibold uppercase tracking-widest mb-3 ${styles.heading}`}
                >
                  {trailName(lang, trail)}
                </h2>

                <p className="text-sm text-gray-400 mb-3">
                  {formatCompletedCount(
                    lang,
                    trailCompleted,
                    trailExercises.length,
                  )}
                </p>

                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>{t(lang, "progress")}</span>
                  <span>{trailPercentage}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1.5 mb-4">
                  <div
                    className={`${styles.bar} h-1.5 rounded-full transition-all`}
                    style={{ width: `${trailPercentage}%` }}
                  />
                </div>

                {trailExercises.length === 0 ? (
                  <p className="text-xs text-gray-500">
                    {t(lang, "noExercises")}
                  </p>
                ) : (
                  <ul className="space-y-1.5">
                    {trailExercises.map((exercise) => (
                      <li
                        key={exercise.id}
                        className="flex items-center gap-2 text-sm text-gray-300"
                      >
                        <span className="shrink-0">
                          {isCompleted(exercise.id) ? "✅" : "⚪"}
                        </span>
                        <span className="truncate">
                          {exercise.title[lang]}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
