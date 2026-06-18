import type { Language, Trail } from "@/lib/types";

const STRINGS = {
  back: { en: "Back", pt: "Voltar", es: "Volver", de: "Zurück", it: "Indietro", fr: "Retour" },
  theory: { en: "Theory", pt: "Teoria", es: "Teoría", de: "Theorie", it: "Teoria", fr: "Théorie" },
  instructions: { en: "Your Task", pt: "Sua Tarefa", es: "Tu Tarea", de: "Deine Aufgabe", it: "Il Tuo Compito", fr: "Ton Défi" },
  running: {
    en: "Running…",
    pt: "Executando…",
    es: "Ejecutando…",
    de: "Wird ausgeführt…",
    it: "Esecuzione…",
    fr: "Exécution…",
  },
  runLabel: { en: "Executar", pt: "Executar", es: "Ejecutar", de: "Ausführen", it: "Eseguire", fr: "Exécuter" },
  next: { en: "Next →", pt: "Próximo →", es: "Siguiente →", de: "Weiter →", it: "Avanti →", fr: "Suivant →" },
  viewTrail: {
    en: "View trail",
    pt: "Ver trilha",
    es: "Ver ruta",
    de: "Pfad ansehen",
    it: "Vedi percorso",
    fr: "Voir le parcours",
  },
  passed: {
    en: "✓ Passed!",
    pt: "✓ Passou!",
    es: "✓ ¡Aprobado!",
    de: "✓ Bestanden!",
    it: "✓ Superato!",
    fr: "✓ Réussi !",
  },
  output: { en: "Output", pt: "Saída", es: "Salida", de: "Ausgabe", it: "Output", fr: "Sortie" },
  runHint: {
    en: "Run your code to see output here.",
    pt: "Execute o código para ver a saída aqui.",
    es: "Ejecuta tu código para ver la salida aquí.",
    de: "Führe deinen Code aus, um die Ausgabe hier zu sehen.",
    it: "Esegui il tuo codice per vedere l'output qui.",
    fr: "Exécute ton code pour voir la sortie ici.",
  },
  runningTests: {
    en: "Running tests…",
    pt: "Executando testes…",
    es: "Ejecutando pruebas…",
    de: "Tests werden ausgeführt…",
    it: "Esecuzione dei test…",
    fr: "Exécution des tests…",
  },
  testFailedNoOutput: {
    en: "Test failed with no output.",
    pt: "Teste falhou sem saída.",
    es: "La prueba falló sin salida.",
    de: "Test fehlgeschlagen, keine Ausgabe.",
    it: "Test fallito senza output.",
    fr: "Le test a échoué sans sortie.",
  },
  progress: {
    en: "Progress",
    pt: "Progresso",
    es: "Progreso",
    de: "Fortschritt",
    it: "Progresso",
    fr: "Progression",
  },
  noExercises: {
    en: "No exercises available for this trail yet.",
    pt: "Nenhum exercício disponível para esta trilha ainda.",
    es: "Aún no hay ejercicios disponibles para esta ruta.",
    de: "Für diesen Pfad sind noch keine Übungen verfügbar.",
    it: "Nessun esercizio disponibile per questo percorso ancora.",
    fr: "Aucun exercice disponible pour ce parcours pour le moment.",
  },
  welcomeLine: {
    en: "Learn Node.js hands-on, from the basics to advanced topics, with guided exercises.",
    pt: "Aprenda Node.js na prática, do zero ao avançado, com exercícios guiados.",
    es: "Aprende Node.js de forma práctica, desde lo básico hasta lo avanzado, con ejercicios guiados.",
    de: "Lerne Node.js praxisnah, von den Grundlagen bis zu fortgeschrittenen Themen, mit angeleiteten Übungen.",
    it: "Impara Node.js in modo pratico, dalle basi agli argomenti avanzati, con esercizi guidati.",
    fr: "Apprends Node.js de façon pratique, des bases aux sujets avancés, avec des exercices guidés.",
  },
  start: { en: "Start", pt: "Começar", es: "Comenzar", de: "Starten", it: "Inizia", fr: "Commencer" },
  resetButton: {
    en: "Reset progress",
    pt: "Resetar progresso",
    es: "Reiniciar progreso",
    de: "Fortschritt zurücksetzen",
    it: "Reimposta progressi",
    fr: "Réinitialiser la progression",
  },
  resetConfirm: {
    en: "Are you sure? This will erase all your progress and restart from the beginning.",
    pt: "Tem certeza? Isso apagará todo o seu progresso e você voltará ao início.",
    es: "¿Estás seguro? Esto borrará todo tu progreso y volverás al principio.",
    de: "Bist du sicher? Dies löscht deinen gesamten Fortschritt und du beginnst von vorne.",
    it: "Sei sicuro? Questo cancellerà tutti i tuoi progressi e ricomincerai dall'inizio.",
    fr: "Êtes-vous sûr ? Cela effacera toute votre progression et vous recommencerez depuis le début.",
  },
  stats: {
    en: "Stats",
    pt: "Estatísticas",
    es: "Estadísticas",
    de: "Statistiken",
    it: "Statistiche",
    fr: "Statistiques",
  },
  statsTitle: {
    en: "Your Progress",
    pt: "Seu Progresso",
    es: "Tu Progreso",
    de: "Dein Fortschritt",
    it: "Il Tuo Progresso",
    fr: "Votre Progression",
  },
} satisfies Record<string, Record<Language, string>>;

export function t(lang: Language, key: keyof typeof STRINGS): string {
  return STRINGS[key][lang];
}

const TRAIL_NAMES: Record<Trail, Record<Language, string>> = {
  zero: {
    en: "Absolute zero",
    pt: "Zero absoluto",
    es: "Cero absoluto",
    de: "Absoluter Anfänger",
    it: "Zero assoluto",
    fr: "Zéro absolu",
  },
  intermediate: {
    en: "Intermediate",
    pt: "Intermediário",
    es: "Intermedio",
    de: "Mittelstufe",
    it: "Intermedio",
    fr: "Intermédiaire",
  },
  advanced: {
    en: "Advanced",
    pt: "Avançado",
    es: "Avanzado",
    de: "Fortgeschritten",
    it: "Avanzato",
    fr: "Avancé",
  },
};

export function trailName(lang: Language, trail: Trail): string {
  return TRAIL_NAMES[trail][lang];
}

export function completedCount(
  lang: Language,
  n: number,
  total: number,
): string {
  switch (lang) {
    case "pt":
      return `${n} de ${total} concluídos`;
    case "es":
      return `${n} de ${total} completados`;
    case "de":
      return `${n} von ${total} abgeschlossen`;
    case "it":
      return `${n} di ${total} completati`;
    case "fr":
      return `${n} sur ${total} terminés`;
    default:
      return `${n} of ${total} completed`;
  }
}

const MOTIVATIONAL_MESSAGES = {
  started: {
    en: "Just getting started!",
    pt: "Só começando!",
    es: "¡Recién empezando!",
    de: "Gerade erst angefangen!",
    it: "Appena iniziato!",
    fr: "Vous commencez à peine !",
  },
  progressing: {
    en: "Making good progress!",
    pt: "Progredindo bem!",
    es: "¡Buen progreso!",
    de: "Guter Fortschritt!",
    it: "Ottimi progressi!",
    fr: "Bon progrès !",
  },
  halfway: {
    en: "More than halfway there!",
    pt: "Mais da metade do caminho!",
    es: "¡Más de la mitad!",
    de: "Mehr als die Hälfte geschafft!",
    it: "Più della metà!",
    fr: "Plus de la moitié !",
  },
  almostThere: {
    en: "Almost there!",
    pt: "Quase lá!",
    es: "¡Casi terminado!",
    de: "Fast geschafft!",
    it: "Quasi finito!",
    fr: "Presque fini !",
  },
  completed: {
    en: "You completed NodeKatas! 🎉",
    pt: "Você completou o NodeKatas! 🎉",
    es: "¡Completaste NodeKatas! 🎉",
    de: "Du hast NodeKatas abgeschlossen! 🎉",
    it: "Hai completato NodeKatas! 🎉",
    fr: "Vous avez terminé NodeKatas ! 🎉",
  },
} satisfies Record<string, Record<Language, string>>;

export function motivationalMessage(lang: Language, percentage: number): string {
  if (percentage >= 100) return MOTIVATIONAL_MESSAGES.completed[lang];
  if (percentage >= 76) return MOTIVATIONAL_MESSAGES.almostThere[lang];
  if (percentage >= 51) return MOTIVATIONAL_MESSAGES.halfway[lang];
  if (percentage >= 26) return MOTIVATIONAL_MESSAGES.progressing[lang];
  return MOTIVATIONAL_MESSAGES.started[lang];
}
