import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import AdminHeader from '@/components/AdminHeader';
import Link from 'next/link';

// Type definition for better type safety
type Competition = {
  title: string;
  image: string;
  question: string;
  answers: string[];
  correctAnswer: string;
  tickets: number;
  price: number;
  drawDate: string;
};

export default function DashboardPage() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);

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

  // Stats
  const totalComps = competitions.length;
  const liveComps = competitions.filter(comp => !isFinished(comp.drawDate)).length;
  const finishedComps = totalComps - liveComps;
  const totalTickets = competitions.reduce((sum, comp) => sum + comp.tickets, 0);
  const totalValue = competitions.reduce((sum, comp) => sum + comp.tickets * comp.price, 0);

  return (
    <AdminLayout>
      <AdminHeader title="Admin Dashboard" subtitle="Manage your competitions below." />

      <div style={styles.statsGrid}>
        <div style={styles.statCard}><strong>{totalComps}</strong><span>Total Competitions</span></div>
        <div style={styles.statCard}><strong>{liveComps}</strong><span>Live Competitions</span></div>
        <div style={styles.statCard}><strong>{finishedComps}</strong><span>Finished Competitions</span></div>
        <div style={styles.statCard}><strong>{totalTickets}</strong><span>Total Tickets</span></div>
        <div style={styles.statCard}><strong>£{totalValue.toFixed(2)}</strong><span>Estimated Value</span></div>
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
    flexWrap: 'wrap' as const,
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
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },
  statCard: {
    background: '#fff',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center' as const,
  },
};
