import { motion, AnimatePresence } from "framer-motion";

type FadeProps = {
  in: boolean;
  children: React.ReactNode;
  duration?: number;
};

export const Fade = ({
  in: isVisible,
  children,
  duration = 0.2,
}: FadeProps) => {
  return (
    <AnimatePresence initial={false}>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration }}
          style={{ overflow: "hidden" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
