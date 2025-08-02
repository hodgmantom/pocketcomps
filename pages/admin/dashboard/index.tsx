import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import AdminHeader from '@/components/AdminHeader';
import Link from 'next/link';

export default function DashboardPage() {
  const [competitions, setCompetitions] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('competitions') || '[]');
    setCompetitions(saved);
  }, []);

  const handleDelete = (index: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this competition?');
    if (!confirmDelete) return;

    const updated = competitions.filter((_, i) => i !== index);
    setCompetitions(updated);
    localStorage.setItem('competitions', JSON.stringify(updated));
  };

  const isFinished = (drawDate: string) => {
    const today = new Date();
    const draw = new Date(drawDate);
    return draw <= today;
  };

  const totalValue = competitions.reduce((sum, comp) => sum + Number(comp.price || 0), 0);
  const liveCount = competitions.filter((comp) => !isFinished(comp.drawDate)).length;
  const finishedCount = competitions.length - liveCount;

  return (
    <AdminLayout>
      <AdminHeader title="Admin Dashboard" subtitle="Manage your competitions below." />

      <div style={styles.statsContainer}>
        <div style={styles.statBox}><h3 style={styles.statNumber}>{competitions.length}</h3><p style={styles.statLabel}>Total Competitions</p></div>
        <div style={styles.statBox}><h3 style={styles.statNumber}>{liveCount}</h3><p style={styles.statLabel}>Live Competitions</p></div>
        <div style={styles.statBox}><h3 style={styles.statNumber}>{finishedCount}</h3><p style={styles.statLabel}>Finished Competitions</p></div>
        <div style={styles.statBox}><h3 style={styles.statNumber}>£{totalValue.toFixed(2)}</h3><p style={styles.statLabel}>Total Estimated Value</p></div>
      </div>

      <div style={styles.buttonRow}>
        <Link href="/admin/dashboard/create">
          <button style={styles.button}>➕ Create New Competition</button>
        </Link>
      </div>

      {competitions.length === 0 ? (
        <p style={{ color: '#666' }}>No competitions created yet.</p>
      ) : (
        <ul style={styles.list}>
          {competitions.map((comp, i) => (
            <li key={i} style={styles.item}>
              <img src={comp.image} alt="Prize" style={styles.thumbnail} />
              <div style={{ flex: 1 }}>
                <strong>{comp.title}</strong>
                <p style={{ margin: 0 }}>🎟 {comp.tickets} tickets | 💷 £{comp.price}</p>
                <p style={{ margin: 0 }}>📅 Draw: {comp.drawDate}</p>
                <span style={{
                  ...styles.statusBadge,
                  backgroundColor: isFinished(comp.drawDate) ? '#ef4444' : '#10b981',
                }}>
                  {isFinished(comp.drawDate) ? 'Finished' : 'Live'}
                </span>
              </div>
              <div style={styles.actions}>
                <button
                  style={styles.editButton}
                  onClick={() => alert('Edit coming soon')}
                >
                  ✏️ Edit
                </button>
                <button
                  style={styles.deleteButton}
                  onClick={() => handleDelete(i)}
                >
                  🗑 Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </AdminLayout>
  );
}

const styles = {
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },
  statBox: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '1.25rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    textAlign: 'center' as const,
  },
  statNumber: {
    fontSize: '2rem',
    margin: 0,
    color: '#1f2937',
  },
  statLabel: {
    fontSize: '0.95rem',
    color: '#6b7280',
    marginTop: '0.25rem',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
  },
  item: {
    background: '#fff',
    borderRadius: '8px',
    padding: '1rem',
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  thumbnail: {
    width: '80px',
    height: '80px',
    objectFit: 'cover' as const,
    borderRadius: '6px',
  },
  buttonRow: {
    marginBottom: '2rem',
  },
  button: {
    backgroundColor: '#0070f3',
    color: '#fff',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem',
  },
  editButton: {
    backgroundColor: '#facc15',
    color: '#000',
    padding: '0.25rem 0.5rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    color: '#fff',
    padding: '0.25rem 0.5rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  statusBadge: {
    display: 'inline-block',
    marginTop: '0.5rem',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '0.8rem',
    fontWeight: 'bold',
  },
};
