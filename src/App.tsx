import { useEffect, useState, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "./components/Loader";
import VariantSwitcher from "./components/VariantSwitcher";
import { VariantProvider, useVariant } from "./context/VariantContext";
import { useLenis } from "./hooks/useLenis";

const Cyberpunk = lazy(() => import("./variants/Cyberpunk"));
const Minimal = lazy(() => import("./variants/Minimal"));
const Wireframe = lazy(() => import("./variants/Wireframe"));
const Premium = lazy(() => import("./variants/Premium"));
const Organic = lazy(() => import("./variants/Organic"));

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
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
          {variant === "cyberpunk" && <Cyberpunk />}
          {variant === "minimal" && <Minimal />}
          {variant === "wireframe" && <Wireframe />}
          {variant === "premium" && <Premium />}
          {variant === "organic" && <Organic />}
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 1300); return () => clearTimeout(t); }, []);
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
