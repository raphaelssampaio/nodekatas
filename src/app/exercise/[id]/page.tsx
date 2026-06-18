import { notFound } from 'next/navigation';
import { getAllExercises } from '@/lib/exercises';
import ExerciseClient from '@/components/ExerciseClient';

interface Props {
  params: { id: string };
}

export default function ExercisePage({ params }: Props) {
  const exercises = getAllExercises();
  const exercise = exercises.find((e) => e.id === params.id);

  if (!exercise) notFound();

  const nextExercise = exercises.find(
    (e) => e.trail === exercise.trail && e.order === exercise.order + 1,
  );

  return (
    <ExerciseClient
      exercise={exercise}
      nextExerciseId={nextExercise?.id ?? null}
    />
  );
}
