import * as React from "react";

interface DiagramProps {
  /** Optional caption shown under the diagram. */
  caption?: string;
  /** Inline SVG (or any JSX) making up the diagram. */
  children: React.ReactNode;
}

/**
 * Wrapper that frames an inline-SVG diagram with a consistent card + caption.
 * Lesson pages pass raw <svg>…</svg> as children.
 */
export function Diagram({ caption, children }: DiagramProps) {
  return (
    <figure className="my-6 overflow-hidden rounded-xl border bg-card">
      <div className="flex w-full justify-center overflow-x-auto bg-gradient-to-b from-muted/40 to-transparent p-4">
        {children}
      </div>
      {caption && (
        <figcaption className="border-t bg-muted/30 px-4 py-2 text-center text-xs text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
