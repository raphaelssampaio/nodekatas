"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore, hasPersistedState } from "@/lib/store";
import { t } from "@/lib/i18n";

interface Props {
  firstExerciseId: string | null;
}

export default function OnboardingClient({ firstExerciseId }: Props) {
  const router = useRouter();
  const lang = useStore((state) => state.lang);
  const setTrail = useStore((state) => state.actions.setTrail);
  const setCurrentExercise = useStore(
    (state) => state.actions.setCurrentExercise,
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (hasPersistedState()) {
      router.replace("/roadmap");
      return;
    }
    setMounted(true);
  }, [router]);

  function handleStart() {
    setTrail("zero");
    if (firstExerciseId) setCurrentExercise(firstExerciseId);
    router.push("/roadmap");
  }

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-bold tracking-tight mb-2">NodeKatas</h1>
      <p className="text-gray-400 mb-10 text-center max-w-md">
        {t(lang, "welcomeLine")}
      </p>

      <button
        onClick={handleStart}
        className="py-3 px-8 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium"
      >
        {t(lang, "start")}
      </button>
    </main>
  );
}
