import { Link } from 'react-router'

type EmptyStateProps = {
  index?: string
  title: string
  body: string
  link?: { label: string; to: string }
}

export default function EmptyState({ index = '00', title, body, link }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <span className="empty-state__index">[{index}]</span>
      <div>
        <h2>{title}</h2>
        <p>{body}</p>
        {link ? <Link className="text-link" to={link.to}>{link.label}</Link> : null}
      </div>
    </div>
  )
}
