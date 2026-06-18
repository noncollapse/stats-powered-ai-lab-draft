type ArrowProps = {
  direction?: 'right' | 'left' | 'down'
}

export default function Arrow({ direction = 'right' }: ArrowProps) {
  const rotation = direction === 'left' ? 'rotate(180 8 8)' : direction === 'down' ? 'rotate(90 8 8)' : undefined
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" fill="none">
      <g transform={rotation}>
        <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}
