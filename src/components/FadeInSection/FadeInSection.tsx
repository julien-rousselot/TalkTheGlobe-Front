// components/FadeInSection.tsx
import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
}

const FadeInSection = ({ children, className = "" }: FadeInSectionProps) => (
  <motion.div
    className={className}
    variants={fadeUpVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }} // 30% visible to trigger
  >
    {children}
  </motion.div>
);

export default FadeInSection;
