import { getAllExercises } from '@/lib/exercises';
import RoadmapClient from '@/components/RoadmapClient';

export default function RoadmapPage() {
  const exercises = getAllExercises();
  return <RoadmapClient allExercises={exercises} />;
}
