import fs from 'fs';
import path from 'path';
import type { Exercise } from './types';

const EXERCISES_DIR = path.join(process.cwd(), 'src/data/exercises');

export function getAllExercises(): Exercise[] {
  const files = fs.readdirSync(EXERCISES_DIR).filter((f) => f.endsWith('.json'));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(EXERCISES_DIR, file), 'utf-8');
      return JSON.parse(raw) as Exercise;
    })
    .sort((a, b) => a.order - b.order);
}
