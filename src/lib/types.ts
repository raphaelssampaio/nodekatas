export type Trail = 'zero' | 'intermediate' | 'advanced';

export type Language = 'en' | 'pt' | 'es' | 'de' | 'it' | 'fr';

export interface Exercise {
  id: string;
  trail: Trail;
  order: number;
  title: {
    en: string;
    pt: string;
    es: string;
    de: string;
    it: string;
    fr: string;
  };
  theory: {
    en: string;
    pt: string;
    es: string;
    de: string;
    it: string;
    fr: string;
  };
  starter: string;
  solution: string;
  tests: string[];
}

export interface UserProgress {
  completedIds: string[];
  currentId: string;
  trail: Trail;
}
