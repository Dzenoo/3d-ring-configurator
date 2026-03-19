"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Settings, ChevronRight, Gem, CircleDot } from "lucide-react";
import { useAppStore, metalPresets, gemPresets } from "@/store/app.store";

const ConfiguratorPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"metal" | "gem">("metal");
  const { selectedMetal, selectedGem, setMetal, setGem } = useAppStore();

  return (
    <>
      {/* Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed right-6 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/80 p-3 shadow-lg backdrop-blur-md transition-colors hover:bg-white"
          >
            <Settings size={20} className="text-neutral-700" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-20 flex h-full w-[340px] max-sm:w-full flex-col"
          >
            {/* Glass background */}
            <div className="absolute inset-0 bg-white/60 backdrop-blur-xl max-sm:bg-white/80" />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-neutral-200/50 px-6 py-5">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-neutral-900">
                    Customize
                  </h2>
                  <p className="mt-0.5 text-xs text-neutral-500">
                    Design your perfect ring
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-2 transition-colors hover:bg-neutral-100"
                >
                  <ChevronRight size={18} className="text-neutral-500" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 border-b border-neutral-200/50 px-6 pt-4 pb-0">
                <TabButton
                  active={activeTab === "metal"}
                  onClick={() => setActiveTab("metal")}
                  icon={<CircleDot size={14} />}
                  label="Metal"
                />
                <TabButton
                  active={activeTab === "gem"}
                  onClick={() => setActiveTab("gem")}
                  icon={<Gem size={14} />}
                  label="Gemstone"
                />
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto px-6 py-5">
                <AnimatePresence mode="wait">
                  {activeTab === "metal" ? (
                    <motion.div
                      key="metal"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="mb-4 text-xs font-medium uppercase tracking-widest text-neutral-400">
                        Band Material
                      </p>
                      <div className="flex flex-col gap-2">
                        {metalPresets.map((preset) => (
                          <MetalOption
                            key={preset.name}
                            preset={preset}
                            isSelected={selectedMetal === preset.name}
                            onClick={() => setMetal(preset)}
                          />
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="gem"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="mb-4 text-xs font-medium uppercase tracking-widest text-neutral-400">
                        Stone Type
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {gemPresets.map((preset) => (
                          <GemOption
                            key={preset.name}
                            preset={preset}
                            isSelected={selectedGem === preset.name}
                            onClick={() => setGem(preset)}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Summary Footer */}
              <div className="border-t border-neutral-200/50 px-6 py-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-neutral-400">Your Selection</p>
                    <p className="text-sm font-medium text-neutral-800">
                      {selectedMetal} &middot; {selectedGem}
                    </p>
                  </div>
                  <motion.div
                    className="rounded-full bg-neutral-900 px-5 py-2.5 text-xs font-medium text-white"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Save Design
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const TabButton: React.FC<{
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`relative flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium transition-colors ${
      active ? "text-neutral-900" : "text-neutral-400 hover:text-neutral-600"
    }`}
  >
    {icon}
    {label}
    {active && (
      <motion.div
        layoutId="activeTab"
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-900"
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      />
    )}
  </button>
);

const MetalOption: React.FC<{
  preset: { name: string; ringColor: string };
  isSelected: boolean;
  onClick: () => void;
}> = ({ preset, isSelected, onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
      isSelected
        ? "bg-neutral-900 text-white shadow-lg"
        : "bg-neutral-50 text-neutral-700 hover:bg-neutral-100"
    }`}
  >
    <div
      className="h-8 w-8 rounded-full shadow-inner"
      style={{
        background: `linear-gradient(135deg, ${preset.ringColor}, ${preset.ringColor}88)`,
        border: isSelected ? "2px solid rgba(255,255,255,0.3)" : "2px solid rgba(0,0,0,0.05)",
      }}
    />
    <span className="text-sm font-medium">{preset.name}</span>
    {isSelected && (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="ml-auto h-2 w-2 rounded-full bg-white"
      />
    )}
  </motion.button>
);

const GemOption: React.FC<{
  preset: { name: string; color: string };
  isSelected: boolean;
  onClick: () => void;
}> = ({ preset, isSelected, onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.97 }}
    className={`flex flex-col items-center gap-2 rounded-xl px-3 py-4 transition-all ${
      isSelected
        ? "bg-neutral-900 text-white shadow-lg"
        : "bg-neutral-50 text-neutral-700 hover:bg-neutral-100"
    }`}
  >
    <div
      className="h-10 w-10 rounded-full"
      style={{
        background: `radial-gradient(circle at 30% 30%, ${preset.color}ff, ${preset.color}99)`,
        boxShadow: isSelected
          ? `0 4px 15px ${preset.color}66`
          : `0 2px 8px ${preset.color}33`,
        border: isSelected ? "2px solid rgba(255,255,255,0.3)" : "2px solid rgba(0,0,0,0.05)",
      }}
    />
    <span className="text-xs font-medium">{preset.name}</span>
  </motion.button>
);

export default ConfiguratorPanel;
