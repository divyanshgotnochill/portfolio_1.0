import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from 'motion/react'
import { useRef, useState, type PointerEvent } from 'react'
import { blogPosts, type BlogPost } from '../data/blogPosts'

const THUMB_W = 280
const THUMB_H = 176
const SPRING = { stiffness: 115, damping: 20, mass: 0.7 }

function BlogList() {
  const listRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState<BlogPost | null>(null)
  const [visible, setVisible] = useState(false)
  const [isTouchDevice] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: none) and (pointer: coarse)').matches,
  )

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const x = useSpring(mouseX, SPRING)
  const y = useSpring(mouseY, SPRING)
  const velX = useVelocity(x)
  const velY = useVelocity(y)
  const rotate = useTransform(velX, [-1800, 1800], [-5, 5])
  const skewX = useTransform(velX, [-1800, 1800], [3, -3])
  const scaleY = useTransform(velY, [-1400, 1400], [1.03, 0.97])

  function placeThumbnail(clientX: number, clientY: number, snap = false) {
    const flipX = clientX > window.innerWidth - THUMB_W - 48
    const flipY = clientY > window.innerHeight - THUMB_H - 48
    const nextX = clientX + (flipX ? -THUMB_W - 28 : 28)
    const nextY = clientY + (flipY ? -THUMB_H - 16 : 16)
    mouseX.set(nextX)
    mouseY.set(nextY)

    if (snap) {
      x.jump(nextX)
      y.jump(nextY)
    }
  }

  function showPreview(post: BlogPost, clientX?: number, clientY?: number) {
    setActive(post)
    setVisible(true)

    if (clientX !== undefined && clientY !== undefined) {
      placeThumbnail(clientX, clientY, !visible)
    }
  }

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (visible) placeThumbnail(event.clientX, event.clientY)
  }

  function handlePointerLeaveList(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === 'touch') return
    const next = event.relatedTarget
    if (next instanceof Node && listRef.current?.contains(next)) return
    setVisible(false)
  }

  return (
    <section
      ref={listRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeaveList}
      className="relative mx-auto mt-5 w-full font-blog-sans"
      aria-label="Blog index preview"
    >
      {isTouchDevice ? (
        <p className="mb-2 border-b border-rule pb-3 text-[11px] leading-5 text-muted">
          Best experienced on desktop — this interaction uses cursor movement.
        </p>
      ) : null}
      <ul className="divide-y divide-rule">
        {blogPosts.map((post) => {
          const isActive = visible && active?.id === post.id

          return (
            <li key={post.id}>
              <button
                type="button"
                aria-pressed={active?.id === post.id}
                aria-label={`Preview blog post: ${post.title}`}
                onFocus={(event) => {
                  const bounds = event.currentTarget.getBoundingClientRect()
                  showPreview(post, bounds.left, bounds.top)
                }}
                onBlur={() => setVisible(false)}
                onPointerEnter={(event) =>
                  showPreview(post, event.clientX, event.clientY)
                }
                onPointerUp={(event) => {
                  if (event.pointerType === 'touch') {
                    setActive(post)
                    setVisible(false)
                  }
                }}
                className="group grid min-h-20 w-full grid-cols-[2rem_minmax(0,1fr)] items-baseline gap-x-4 gap-y-1 py-5 text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:grid-cols-[2.5rem_minmax(0,1fr)_auto] sm:gap-x-5"
              >
                <span className="pt-1 font-sans text-[10px] tracking-[0.18em] text-muted">
                  {post.id}
                </span>
                <span
                    className={`font-blog-serif text-[clamp(1.35rem,4vw,2rem)] leading-[1.15] tracking-[-0.02em] transition-colors duration-200 ${
                    isActive ? 'text-secondary' : 'text-ink group-hover:text-secondary'
                  }`}
                >
                  {post.title}
                </span>
                <span className="col-start-2 mt-1 font-sans text-[10px] uppercase tracking-[0.14em] text-muted sm:col-start-2">
                  {post.category}
                  <span aria-hidden="true" className="mx-2 text-rule">
                    /
                  </span>
                  {post.readTime}
                </span>
                <span className="hidden font-sans text-[11px] text-muted sm:block">
                  {post.date}
                </span>
              </button>
              {active?.id === post.id ? (
                <img
                  alt=""
                  aria-hidden="true"
                  className="mb-5 aspect-video w-full rounded-md border border-rule object-cover [@media(hover:hover)]:hidden"
                  height="176"
                  src={post.thumbnail}
                  width="280"
                />
              ) : null}
            </li>
          )
        })}
      </ul>

      <SurfingThumbnail
        post={active}
        visible={visible}
        x={x}
        y={y}
        rotate={rotate}
        skewX={skewX}
        scaleY={scaleY}
      />
    </section>
  )
}

function SurfingThumbnail({
  post,
  visible,
  x,
  y,
  rotate,
  skewX,
  scaleY,
}: {
  post: BlogPost | null
  visible: boolean
  x: MotionValue<number>
  y: MotionValue<number>
  rotate: MotionValue<number>
  skewX: MotionValue<number>
  scaleY: MotionValue<number>
}) {
  if (typeof document === 'undefined') return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-50 hidden origin-top-left will-change-transform [@media(hover:hover)]:block"
      style={{ x, y, rotate, skewX, scaleY, width: THUMB_W, height: THUMB_H }}
      initial={false}
      animate={{
        opacity: visible && post ? 1 : 0,
        scale: visible && post ? 1 : 0.94,
      }}
      transition={{ type: 'spring', stiffness: 260, damping: 26, mass: 0.7 }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-md border border-rule bg-surface">
        <AnimatePresence initial={false}>
          {post ? (
            <motion.img
              key={post.id}
              src={post.thumbnail}
              alt=""
              width={THUMB_W}
              height={THUMB_H}
              className="absolute inset-0 h-full w-full rounded-md object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default BlogList
