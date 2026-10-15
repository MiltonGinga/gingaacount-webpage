import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

const VARIANTS = {
  // Cada modal pode entrar de forma diferente.
  zoom: { initial: { opacity: 0, scale: 0.85, y: 40, rotateX: 12 }, animate: { opacity: 1, scale: 1, y: 0, rotateX: 0 }, exit: { opacity: 0, scale: 0.9, y: 30 } },
  slide: { initial: { opacity: 0, x: 120 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 120 } },
  rise: { initial: { opacity: 0, y: 120 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 80 } },
  pop: { initial: { opacity: 0, scale: 0.5, rotate: -6 }, animate: { opacity: 1, scale: 1, rotate: 0 }, exit: { opacity: 0, scale: 0.6, rotate: 4 } },
}

/**
 * Modal personalizado: fundo desfocado, entrada com mola, fecha com Esc/clique fora,
 * cabeçalho colorido por tom (blue | green | red) e área de conteúdo com rolagem própria.
 */
export default function Modal({ open, onClose, title, subtitle, icon, tone = 'blue', variant = 'zoom', width = 720, children, footer }) {
  const panel = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    setTimeout(() => panel.current?.focus(), 50)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  const v = VARIANTS[variant] || VARIANTS.zoom

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            ref={panel}
            className={`modal tone-${tone}`}
            role="dialog"
            aria-modal="true"
            aria-label={typeof title === 'string' ? title : undefined}
            tabIndex={-1}
            style={{ maxWidth: width }}
            initial={v.initial}
            animate={v.animate}
            exit={v.exit}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          >
            <div className="modal-head">
              <motion.div className="modal-glow" animate={{ x: ['-20%', '20%', '-20%'] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
              {icon && (
                <motion.div className="modal-icon" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.12, type: 'spring', stiffness: 300 }}>
                  {icon}
                </motion.div>
              )}
              <div className="modal-titles">
                <h3>{title}</h3>
                {subtitle && <p>{subtitle}</p>}
              </div>
              <motion.button className="modal-close" onClick={onClose} aria-label="Fechar" whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <X size={20} />
              </motion.button>
            </div>
            <motion.div
              className={`modal-body scroll-${tone} scroll-thin`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              {children}
            </motion.div>
            {footer && <div className="modal-foot">{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
