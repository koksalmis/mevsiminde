export const foodSymbols: Record<string, string> = {
  strawberry: "🍓", cherry: "🍒", watermelon: "🍉", tomato: "🍅",
  pepper: "🫑", pomegranate: "🔴", apple: "🍎", pear: "🍐",
  orange: "🍊", tangerine: "🍊", spinach: "🥬", leek: "🌿",
  artichoke: "🌿", zucchini: "🥒", broccoli: "🥦",
};
export function foodSymbol(id: string) { return foodSymbols[id] ?? "🌱"; }
