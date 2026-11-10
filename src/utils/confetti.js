import confetti from 'canvas-confetti';

export const triggerCelebration = () => {
  confetti({
    particleCount: 50,
    spread: 60,
    origin: { y: 0.8 },
    colors: ['#8B5CF6', '#10B981', '#38BDF8', '#F97316'],
  });
};

