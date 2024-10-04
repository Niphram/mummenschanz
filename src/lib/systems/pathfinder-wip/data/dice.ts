export const DICE_VALUES = [4, 6, 8, 10, 12, 20, 100] as const;
export type Dice = (typeof DICE_VALUES)[number];
