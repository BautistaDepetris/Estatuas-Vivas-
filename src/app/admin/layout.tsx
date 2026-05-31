'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const enlaces = [
    { href: '/admin', label: 'Dashboard', count: '' },
    { href: '/admin/estatuas', label: 'Estatuas', count: '02' },
    { href: '/admin/pagina-principal', label: 'Página Principal', count: '' },
];
export default function AdminLayout({ children }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    return (<div>
      <aside>
        <div>
          <Link href="/">
            San Lorenzo
          </Link>
          <p>
            Admin
          </p>
        </div>
        <nav>
          {enlaces.map((enlace) => {
            const activo = enlace.href === '/admin'
                ? pathname === enlace.href
                : pathname === enlace.href || pathname.startsWith(`${enlace.href}/`);
            return (<Link key={enlace.href} href={enlace.href}>
                <span>{enlace.label}</span>
                {enlace.count && (<span>
                    {enlace.count}
                  </span>)}
              </Link>);
        })}
        </nav>
        <div>
          Sesión · 8:21
          <br />
          <span>Marina Tula</span>
        </div>
      </aside>
      <main>{children}</main>
    </div>);
}
