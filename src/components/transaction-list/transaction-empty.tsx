import { motion } from "motion/react";

export function TransactionEmpty() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-16 text-center"
    >
      <p className="mb-2 text-3xl">💸</p>
      <p className="text-muted-foreground text-sm">Aucune transaction</p>
    </motion.div>
  );
}
