"use client";

import { useEffect } from "react";
import { useProgress } from "@react-three/drei";
import { Diamond } from "lucide-react";
import { motion, useAnimate } from "motion/react";

const LoadingScreen: React.FC = () => {
  const { progress } = useProgress();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(async () => {
        await animate(
          scope.current,
          { opacity: 0 },
          { duration: 0.8, ease: "easeInOut" },
        );
        scope.current?.remove();
      }, 800);

      return () => clearTimeout(timeout);
    }
  }, [progress, animate, scope]);

  return (
    <div
      ref={scope}
      className="fixed inset-0 z-50 flex h-full w-full flex-col items-center justify-center gap-6 bg-neutral-950"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        <Diamond size={24} className="text-amber-400" />
      </motion.div>

      <div className="flex flex-col items-center gap-4">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xs font-medium tracking-[0.3em] uppercase text-neutral-400"
        >
          Loading Experience
        </motion.p>

        <div className="w-48">
          <div className="h-[1px] w-full bg-neutral-800">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-200"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.3 }}
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 text-center text-[10px] tabular-nums text-neutral-600"
          >
            {Math.round(progress)}%
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
