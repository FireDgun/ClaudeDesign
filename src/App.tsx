import { useEffect, useState, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "./components/Loader";
import VariantSwitcher from "./components/VariantSwitcher";
import { VariantProvider, useVariant } from "./context/VariantContext";
import { useLenis } from "./hooks/useLenis";

const Crystal = lazy(() => import("./variants/Crystal"));
const Editorial = lazy(() => import("./variants/Editorial"));
const Brutalist = lazy(() => import("./variants/Brutalist"));
const Glass = lazy(() => import("./variants/Glass"));
const Aurora = lazy(() => import("./variants/Aurora"));

function VariantHost() {
  const { variant } = useVariant();
  useLenis(true);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={variant}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Suspense fallback={<div className="min-h-screen bg-ink-900" />}>
          {variant === "crystal" && <Crystal />}
          {variant === "editorial" && <Editorial />}
          {variant === "brutalist" && <Brutalist />}
          {variant === "glass" && <Glass />}
          {variant === "aurora" && <Aurora />}
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <VariantProvider>
      <AnimatePresence mode="wait">{loading && <Loader key="loader" />}</AnimatePresence>
      {!loading && (
        <>
          <VariantHost />
          <VariantSwitcher />
        </>
      )}
    </VariantProvider>
  );
}
