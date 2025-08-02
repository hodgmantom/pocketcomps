import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('admin-auth') === 'true';
    if (!isLoggedIn) {
      router.push('/admin/login');
    } else {
      setIsAuth(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin-auth');
    router.push('/admin/login');
  };

  if (!isAuth) return null;

  return (
    <div style={styles.wrapper}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>PocketComps</h2>
        <nav style={styles.nav}>
          <Link href="/admin/dashboard" style={styles.link}>🏠 Dashboard</Link>
          <Link href="/admin/dashboard/create" style={styles.link}>➕ Create Comp</Link>
          <button onClick={handleLogout} style={styles.logout}>🚪 Logout</button>
        </nav>
      </aside>

      {/* Main content area */}
      <main style={styles.main}>
        {children}
      </main>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: 'sans-serif',
  },
  sidebar: {
    width: '220px',
    backgroundColor: '#111827',
    color: '#fff',
    padding: '2rem 1rem',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.5rem',
  },
  logo: {
    fontSize: '1.5rem',
    marginBottom: '2rem',
    color: '#38bdf8',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
  },
  link: {
    color: '#e5e7eb',
    textDecoration: 'none',
    fontWeight: 500,
    padding: '0.5rem 0',
  },
  logout: {
    background: 'none',
    border: 'none',
    color: '#f87171',
    textAlign: 'left' as const,
    cursor: 'pointer',
    padding: '0.5rem 0',
    fontSize: '1rem',
  },
  main: {
    flex: 1,
    padding: '2rem',
    backgroundColor: '#f9fafb',
  },
};
