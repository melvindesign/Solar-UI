import { type ClassValue, clsx } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * tailwind-merge ne connaît que l'échelle typographique par défaut de Tailwind
 * (`text-sm`, `text-lg`…). Sans cette extension, il interprète `text-label` ou
 * `text-title-6` comme des *couleurs* de texte : la classe est alors écrasée
 * par le premier `text-default-*` rencontré et la taille de police disparaît
 * silencieusement du DOM.
 *
 * On déclare donc explicitement les tokens de la collection Figma « Theme »
 * (Typography / Font Size) comme appartenant au groupe `font-size`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-1", "display-2", "display-3",
            "display-4", "display-5", "display-6",
            "title-1", "title-2", "title-3",
            "title-4", "title-5", "title-6",
            "label", "label-compact",
            "body", "body-compact",
            "code", "code-compact",
            "avatar-fallback-sm",
          ],
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
