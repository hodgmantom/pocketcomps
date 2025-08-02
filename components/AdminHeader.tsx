import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {
  title: string;
  subtitle?: string;
};

export default function AdminHeader({ title, subtitle }: Props) {
  const router = useRouter();

  // Break the path into parts for breadcrumb display
const segments = router.pathname
  .replace('/admin/dashboard', '') // remove /admin/dashboard from start
  .split('/')
  .filter(Boolean);


  const breadcrumbs = segments.map((seg, i) => {
    const href = '/admin/' + segments.slice(0, i + 1).join('/');
    const label = seg.charAt(0).toUpperCase() + seg.slice(1);
    return (
      <span key={href}>
        <Link href={href} style={styles.breadcrumbLink}>{label}</Link>
        {i < segments.length - 1 && ' / '}
      </span>
    );
  });

  return (
    <div style={styles.wrapper}>
<div style={styles.breadcrumbs}>
  <Link href="/admin/dashboard" style={styles.breadcrumbLink}>Dashboard</Link>
  {segments.length > 0 && ' / '}
  {breadcrumbs}
</div>


      <h1 style={styles.title}>{title}</h1>
      {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
      <div style={styles.divider}></div>
    </div>
  );
}

const styles = {
  wrapper: {
    marginBottom: '2rem',
    paddingBottom: '1rem',
  },
  breadcrumbs: {
    fontSize: '0.85rem',
    color: '#666',
    marginBottom: '0.25rem',
  },
  breadcrumbLink: {
    color: '#0070f3',
    textDecoration: 'none',
  },
  title: {
    fontSize: '2.25rem',
    fontWeight: 'bold',
    margin: 0,
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#666',
    marginTop: '0.25rem',
  },
  divider: {
    height: '1px',
    backgroundColor: '#e5e5e5',
    marginTop: '1rem',
  },
};
