import { getAllExercises } from '@/lib/exercises';
import DashboardClient from '@/components/DashboardClient';

export default function DashboardPage() {
  const exercises = getAllExercises();
  return <DashboardClient allExercises={exercises} />;
}
