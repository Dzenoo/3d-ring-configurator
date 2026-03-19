import { create } from "zustand";

export type MetalPreset = {
  name: string;
  ringColor: string;
  sticksColor: string;
  circleColor: string;
};

export type GemPreset = {
  name: string;
  color: string;
};

export const metalPresets: MetalPreset[] = [
  { name: "Gold", ringColor: "#FFD700", sticksColor: "#C0C0C0", circleColor: "#2d2d2d" },
  { name: "Rose Gold", ringColor: "#B76E79", sticksColor: "#C9A9A6", circleColor: "#3d2d2d" },
  { name: "Silver", ringColor: "#C0C0C0", sticksColor: "#A8A8A8", circleColor: "#1d1d1d" },
  { name: "Platinum", ringColor: "#E5E4E2", sticksColor: "#D4D4D4", circleColor: "#2a2a2a" },
  { name: "White Gold", ringColor: "#EFEFEF", sticksColor: "#D8D8D8", circleColor: "#252525" },
];

export const gemPresets: GemPreset[] = [
  { name: "Sapphire", color: "#648dce" },
  { name: "Diamond", color: "#E8E8E8" },
  { name: "Ruby", color: "#E0115F" },
  { name: "Emerald", color: "#50C878" },
  { name: "Amethyst", color: "#9966CC" },
  { name: "Topaz", color: "#FFC87C" },
];

type AppState = {
  ringColor: string;
  sticksColor: string;
  circleColor: string;
  gemColor: string;
  selectedMetal: string;
  selectedGem: string;
  setMetal: (preset: MetalPreset) => void;
  setGem: (preset: GemPreset) => void;
};

export const useAppStore = create<AppState>((set) => ({
  ringColor: metalPresets[0].ringColor,
  sticksColor: metalPresets[0].sticksColor,
  circleColor: metalPresets[0].circleColor,
  gemColor: gemPresets[0].color,
  selectedMetal: metalPresets[0].name,
  selectedGem: gemPresets[0].name,
  setMetal: (preset) =>
    set({
      ringColor: preset.ringColor,
      sticksColor: preset.sticksColor,
      circleColor: preset.circleColor,
      selectedMetal: preset.name,
    }),
  setGem: (preset) =>
    set({
      gemColor: preset.color,
      selectedGem: preset.name,
    }),
}));
