"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CodeEditor from "@/components/CodeEditor";
import { runCode } from "@/lib/webcontainer";
import { useStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import LanguageSelect from "@/components/LanguageSelect";
import BuyMeACoffeeButton from "@/components/BuyMeACoffeeButton";
import TheoryText from "@/components/TheoryText";
import type { Exercise, Language } from "@/lib/types";

interface RunResult {
  passed: boolean;
  output: string;
  error: string | null;
}

interface Props {
  exercise: Exercise;
  nextExerciseId: string | null;
}

export default function ExerciseClient({ exercise, nextExerciseId }: Props) {
  const router = useRouter();
  const lang = useStore((state) => state.lang);
  const setLanguage = useStore((state) => state.actions.setLanguage);
  const markCompleted = useStore((state) => state.actions.markCompleted);
  const [mounted, setMounted] = useState(false);
  const [code, setCode] = useState(exercise.starter);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<RunResult | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleLangChange(next: Language) {
    setLanguage(next);
  }

  useEffect(() => {
    setCode(exercise.starter);
    setResult(null);
  }, [exercise.id, exercise.starter]);

  async function handleRun() {
    setRunning(true);
    setResult(null);
    try {
      const res = await runCode(code, exercise.tests);
      setResult(res);
      if (res.passed) markCompleted(exercise.id, nextExerciseId ?? undefined);
    } catch (err) {
      setResult({
        passed: false,
        output: "",
        error: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setRunning(false);
    }
  }

  function handleNext() {
    if (nextExerciseId) {
      router.push(`/exercise/${nextExerciseId}`);
    } else {
      router.push("/roadmap");
    }
  }

  if (!mounted) return null;

  return (
    <div className="h-screen flex flex-col bg-gray-950 text-white overflow-hidden">
      <header className="shrink-0 border-b border-gray-800 px-5 py-3 flex items-center gap-4">
        <button
          onClick={() => router.push("/roadmap")}
          className="text-sm text-gray-400 hover:text-white"
        >
          ← {t(lang, "back")}
        </button>
        <div className="h-4 w-px bg-gray-700" />
        <div className="min-w-0">
          <span className="font-semibold truncate">{exercise.title[lang]}</span>
          <span className="ml-2 text-xs text-gray-500">#{exercise.order}</span>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <LanguageSelect value={lang} onChange={handleLangChange} />

          <BuyMeACoffeeButton />
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 overflow-hidden">
        <aside className="border-r border-gray-800 overflow-y-auto px-6 py-6 lg:block hidden">
          <div className="mb-6 rounded-lg bg-gray-900 border border-emerald-800/60 px-4 py-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-emerald-500 mb-2">
              {t(lang, "instructions")}
            </h2>
            <p className="text-sm text-gray-200 leading-relaxed">
              {exercise.instructions[lang]}
            </p>
          </div>

          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
            {t(lang, "theory")}
          </h2>
          <TheoryText text={exercise.theory[lang]} />
        </aside>

        <section className="flex flex-col border-r border-gray-800 overflow-hidden">
          <div className="shrink-0 px-4 py-2 border-b border-gray-800 text-xs text-gray-500 font-mono">
            solution.js
          </div>
          <div className="flex-1 overflow-hidden">
            <CodeEditor value={code} onChange={setCode} readOnly={running} />
          </div>

          <div className="shrink-0 border-t border-gray-800 px-4 py-3 flex items-center gap-3">
            <button
              onClick={handleRun}
              disabled={running}
              className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium px-5 py-2 rounded-lg"
            >
              {running ? t(lang, "running") : t(lang, "runLabel")}
            </button>

            {result?.passed && (
              <button
                onClick={handleNext}
                className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-5 py-2 rounded-lg"
              >
                {nextExerciseId ? t(lang, "next") : t(lang, "viewTrail")}
              </button>
            )}

            {result?.passed && (
              <span className="text-emerald-400 text-sm font-medium">
                {t(lang, "passed")}
              </span>
            )}
          </div>
        </section>

        <aside className="overflow-y-auto bg-gray-900 px-5 py-5 font-mono text-sm">
          <div className="text-xs font-sans font-semibold uppercase tracking-widest text-gray-500 mb-4">
            {t(lang, "output")}
          </div>

          {!result && !running && (
            <p className="text-gray-600 text-xs">{t(lang, "runHint")}</p>
          )}

          {running && (
            <p className="text-yellow-400 text-xs animate-pulse">
              {t(lang, "runningTests")}
            </p>
          )}

          {result && (
            <div className="space-y-2">
              {result.output && (
                <pre
                  className={`whitespace-pre-wrap break-words text-xs leading-relaxed ${result.passed ? "text-emerald-400" : "text-gray-300"}`}
                >
                  {result.output}
                </pre>
              )}
              {result.error && (
                <pre className="whitespace-pre-wrap break-words text-xs leading-relaxed text-red-400">
                  {result.error}
                </pre>
              )}
              {!result.passed && !result.error && !result.output && (
                <p className="text-red-400 text-xs">
                  {t(lang, "testFailedNoOutput")}
                </p>
              )}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
