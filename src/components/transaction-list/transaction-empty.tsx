import { motion } from "motion/react";
import { Receipt } from "lucide-react";

export function TransactionEmpty() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-16 text-center"
    >
      <Receipt className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
      <p className="text-muted-foreground text-sm">Aucune transaction</p>
    </motion.div>
  );
}
