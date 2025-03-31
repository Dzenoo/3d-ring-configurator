import React, { useEffect } from "react";
import { useProgress } from "@react-three/drei";
import { Diamond } from "lucide-react";
import { motion, useAnimate } from "motion/react";

const LoadingScreen: React.FC = () => {
  const { progress } = useProgress();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (progress === 100) {
      const interval = setInterval(() => {
        animate(
          scope.current,
          { transform: "translateX(100%)" },
          { duration: 1, ease: "easeInOut", damping: 20 },
        );

        scope.animations.forEach((animation) => {
          animation.finished.then(() => {
            scope.current?.remove();
          });
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [progress]);

  return (
    <div
      ref={scope}
      className="fixed inset-0 top-0 right-0 bottom-0 left-0 z-50 flex h-full w-full flex-col items-center justify-center gap-5 bg-yellow-500"
    >
      <Diamond className="text-yellow-900" />
      <div className="mb-4 text-xs text-yellow-950">Loading... Please wait</div>
      <div className="mx-auto w-96">
        <motion.div
          className="h-[1px] rounded-full bg-black"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear", duration: 0.5 }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
