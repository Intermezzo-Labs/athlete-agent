interface SectionCardProps {
  title: string
  children: React.ReactNode
}

// Pure presentational wrapper – no memo needed (children change with data).
export function SectionCard({ title, children }: SectionCardProps) {
  return (
    <div className="bg-surface border border-line rounded-lg p-6">
      <h3 className="text-xs font-medium text-ink-muted mb-4">{title}</h3>
      {children}
    </div>
  )
}
