import { FloatingEmoji } from "../../lib/emojis";

interface FloatingEmojisPortalProps {
  floatingEmojis: FloatingEmoji[];
}

export default function FloatingEmojisPortal({
  floatingEmojis,
}: FloatingEmojisPortalProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {floatingEmojis.map((e) => (
        <span
          key={e.id}
          className="absolute text-4xl pointer-events-none animate-emoji"
          style={{
            left: `${e.left}px`,
            top: `${e.top}px`,
            "--tx": `${e.tx}px`,
            "--ty": `${e.ty}px`,
            "--rot": `${e.rot}deg`,
          } as React.CSSProperties}
        >
          {e.emoji}
        </span>
      ))}
    </div>
  );
}
