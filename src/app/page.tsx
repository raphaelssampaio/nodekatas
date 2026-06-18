import { getAllExercises } from '@/lib/exercises';
import OnboardingClient from '@/components/OnboardingClient';

export default function Home() {
  const exercises = getAllExercises();
  const firstExerciseId = exercises.find((e) => e.trail === 'zero')?.id ?? null;

  return <OnboardingClient firstExerciseId={firstExerciseId} />;
}
