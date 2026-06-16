export interface FloatingEmoji {
  id: number;
  emoji: string;
  left: number;
  top: number;
  tx: number;
  ty: number;
  rot: number;
}

export function generateFloatingEmojis(isCorrect: boolean, cardElement: HTMLDivElement | null): FloatingEmoji[] {
  const emojisList = isCorrect
    ? ["🎉", "👍", "🥳", "✨", "👏", "🙌", "🤩", "🎯", "🌟"]
    : ["💩", "👎", "😢", "❌", "🤦‍♂️", "💔", "🩹", "🤕"];

  let leftX = 100;
  let rightX = 300;
  let bottomY = 500;

  if (typeof window !== "undefined") {
    if (cardElement) {
      const rect = cardElement.getBoundingClientRect();
      leftX = rect.left;
      rightX = rect.right;
      bottomY = rect.bottom;
    } else {
      leftX = window.innerWidth * 0.25;
      rightX = window.innerWidth * 0.75;
      bottomY = window.innerHeight * 0.7;
    }
  }

  const newEmojis: FloatingEmoji[] = [];
  const countPerSide = 10;

  // Left corner
  for (let i = 0; i < countPerSide; i++) {
    const angle = (Math.random() * 60 + 280) * (Math.PI / 180);
    const distance = Math.random() * 180 + 100;
    newEmojis.push({
      id: Date.now() + i + Math.random(),
      emoji: emojisList[Math.floor(Math.random() * emojisList.length)],
      left: leftX,
      top: bottomY - 20,
      tx: Math.cos(angle) * distance,
      ty: Math.sin(angle) * distance - 80,
      rot: (Math.random() - 0.5) * 180,
    });
  }

  // Right corner
  for (let i = 0; i < countPerSide; i++) {
    const angle = (Math.random() * 60 + 200) * (Math.PI / 180);
    const distance = Math.random() * 180 + 100;
    newEmojis.push({
      id: Date.now() + i + countPerSide + Math.random(),
      emoji: emojisList[Math.floor(Math.random() * emojisList.length)],
      left: rightX - 30,
      top: bottomY - 20,
      tx: Math.cos(angle) * distance,
      ty: Math.sin(angle) * distance - 80,
      rot: (Math.random() - 0.5) * 180,
    });
  }

  return newEmojis;
}
