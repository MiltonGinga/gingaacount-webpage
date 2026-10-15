import { AnimatePresence, motion } from 'framer-motion'
import { CircleAlert, CircleCheck, Info } from 'lucide-react'

const ICONS = { success: CircleCheck, error: CircleAlert, info: Info }

export default function Toasts({ items, onDismiss }) {
  return (
    <div className="toasts" aria-live="polite">
      <AnimatePresence>
        {items.map((t) => {
          const I = ICONS[t.type] || Info
          return (
            <motion.button
              key={t.id}
              layout
              className={`toast ${t.type}`}
              onClick={() => onDismiss(t.id)}
              initial={{ opacity: 0, x: 80, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            >
              <I size={20} />
              <span>{t.text}</span>
              <motion.i className="toast-bar" initial={{ scaleX: 1 }} animate={{ scaleX: 0 }} transition={{ duration: 5, ease: 'linear' }} />
            </motion.button>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
