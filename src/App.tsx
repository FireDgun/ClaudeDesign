import { useEffect, useState, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "./components/Loader";
import VariantSwitcher from "./components/VariantSwitcher";
import { VariantProvider, useVariant } from "./context/VariantContext";
import { useLenis } from "./hooks/useLenis";

const Blueprint = lazy(() => import("./variants/Blueprint"));
const Monograph = lazy(() => import("./variants/Monograph"));
const Constructivist = lazy(() => import("./variants/Constructivist"));
const Kenchiku = lazy(() => import("./variants/Kenchiku"));
const Anderson = lazy(() => import("./variants/Anderson"));

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
        <Suspense fallback={<div className="min-h-screen" />}>
          {variant === "blueprint" && <Blueprint />}
          {variant === "monograph" && <Monograph />}
          {variant === "constructivist" && <Constructivist />}
          {variant === "kenchiku" && <Kenchiku />}
          {variant === "anderson" && <Anderson />}
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1400);
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
