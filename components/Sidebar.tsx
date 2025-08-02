// components/Sidebar.tsx
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside style={styles.sidebar}>
      <h2 style={styles.logo}>PocketComps</h2>
      <nav style={styles.nav}>
        <Link href="/admin/dashboard"><span style={styles.link}>📊 Dashboard</span></Link>
        <Link href="/admin/dashboard/create"><span style={styles.link}>➕ Create Comp</span></Link>
        <Link href="/admin/login"><span style={styles.logout}>🚪 Logout</span></Link>
      </nav>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: '240px',
    background: '#0d1a2d',
    color: '#fff',
    height: '100vh',
    padding: '1rem',
    position: 'fixed' as const,
    top: 0,
    left: 0,
  },
  logo: {
    fontSize: '1.5rem',
    marginBottom: '2rem',
    fontWeight: 'bold',
    color: '#3baaff',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.1rem',
    cursor: 'pointer',
  },
  logout: {
    color: '#f56565',
    cursor: 'pointer',
    marginTop: '2rem',
    fontSize: '1.1rem',
  },
};
