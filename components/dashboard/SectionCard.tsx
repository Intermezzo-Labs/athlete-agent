interface SectionCardProps {
  title: string
  children: React.ReactNode
}

// Pure presentational wrapper – no memo needed (children change with data).
export function SectionCard({ title, children }: SectionCardProps) {
  return (
    <div className="bg-white rounded-lg border border-navy-100 border-t-4 border-t-gold-500 p-6 shadow-sm">
      <h3 className="uppercase tracking-wider text-xs font-bold text-navy-700 mb-4">{title}</h3>
      {children}
    </div>
  )
}
