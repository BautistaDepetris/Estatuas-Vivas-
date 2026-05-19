'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const enlaces = [
  { href: '/admin', label: 'Dashboard', count: '' },
  { href: '/admin/estatuas', label: 'Estatuas', count: '02' },
  { href: '/admin/pagina-principal', label: 'Página Principal', count: '' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="paper-bg" style={{ background: 'var(--bg)', color: 'var(--ink)', display: 'flex', minHeight: '100vh' }}>
      <aside
        style={{
          background: 'var(--bg-2)',
          borderRight: '0.5px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          minHeight: '100vh',
          padding: '36px 0',
          width: '220px',
        }}
      >
        <div style={{ padding: '0 26px 36px' }}>
          <Link
            href="/"
            style={{
              color: 'var(--red)',
              fontFamily: 'var(--font-display)',
              fontSize: '22px',
              fontStyle: 'italic',
              letterSpacing: '-0.02em',
            }}
          >
            San Lorenzo
          </Link>
          <p className="editorial-lbl" style={{ fontSize: '8px', marginTop: '6px' }}>
            Admin
          </p>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column' }}>
          {enlaces.map((enlace) => {
            const activo = enlace.href === '/admin'
              ? pathname === enlace.href
              : pathname === enlace.href || pathname.startsWith(`${enlace.href}/`)

            return (
              <Link
                key={enlace.href}
                href={enlace.href}
                style={{
                  alignItems: 'center',
                  borderLeft: activo ? '2px solid var(--red)' : '2px solid transparent',
                  color: activo ? 'var(--red)' : 'var(--brown)',
                  display: 'flex',
                  fontSize: '9px',
                  fontWeight: 500,
                  justifyContent: 'space-between',
                  letterSpacing: '0.28em',
                  lineHeight: 1.4,
                  padding: '14px 26px',
                  textTransform: 'uppercase',
                }}
              >
                <span>{enlace.label}</span>
                {enlace.count && (
                  <span style={{ color: activo ? 'var(--red)' : 'var(--ink-4)', fontFamily: 'var(--font-display)', fontSize: '12px', fontStyle: 'italic' }}>
                    {enlace.count}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
        <div
          style={{
            color: 'var(--brown)',
            fontSize: '8px',
            letterSpacing: '0.2em',
            lineHeight: 1.8,
            marginTop: 'auto',
            padding: '24px 26px',
            textTransform: 'uppercase',
          }}
        >
          Sesión · 8:21
          <br />
          <span style={{ color: 'var(--ink-3)' }}>Marina Tula</span>
        </div>
      </aside>
      <main style={{ flex: 1, minWidth: 0 }}>{children}</main>
    </div>
  )
}
