"use client";

import { motion } from "motion/react";
import { Gem } from "lucide-react";

const Navbar: React.FC = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
      className="fixed left-0 top-0 z-10 w-full p-6"
    >
      <div className="flex items-center gap-2">
        <Gem size={18} className="text-neutral-700" />
        <h1 className="text-sm font-medium tracking-[0.2em] uppercase text-neutral-700">
          Ring Atelier
        </h1>
      </div>
    </motion.header>
  );
};

export default Navbar;
