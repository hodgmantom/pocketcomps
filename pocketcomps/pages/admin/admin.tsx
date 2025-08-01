import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminPage() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [tickets, setTickets] = useState(0);
  const [price, setPrice] = useState(0);
  const [drawDate, setDrawDate] = useState('');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('admin-auth') === 'true';
    if (!isLoggedIn) {
      router.push('/admin/login');
    } else {
      setIsAuth(true);
    }
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'pocketcomps_upload'); // Replace with your actual preset name

    const res = await fetch('https://api.cloudinary.com/v1_1/dcartbpho/image/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    console.log('Uploaded image URL:', data.secure_url); // ✅ Check console
    setImage(data.secure_url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const compData = {
      title,
      image,
      question,
      answer,
      tickets,
      price,
      drawDate,
    };
    console.log('Competition Created:', compData);
    alert('Competition saved (check console)');
  };

  if (!isAuth) return null;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Create a New Competition</h1>
        <form onSubmit={handleSubmit} style={styles.form}>

          <label style={styles.label}>Title:</label>
          <input style={styles.input} value={title} onChange={e => setTitle(e.target.value)} required />

          <label style={styles.label}>Upload Prize Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={styles.input}
          />
          {image && (
            <img
              src={image}
              alt="Preview"
              style={{ marginTop: '1rem', maxWidth: '100%', borderRadius: '6px' }}
            />
          )}

          <label style={styles.label}>Trivia Question:</label>
          <input style={styles.input} value={question} onChange={e => setQuestion(e.target.value)} required />

          <label style={styles.label}>Correct Answer:</label>
          <input style={styles.input} value={answer} onChange={e => setAnswer(e.target.value)} required />

          <label style={styles.label}>Total Tickets:</label>
          <input style={styles.input} type="number" value={tickets} onChange={e => setTickets(Number(e.target.value))} required />

          <label style={styles.label}>Price per Ticket (£):</label>
          <input style={styles.input} type="number" value={price} onChange={e => setPrice(Number(e.target.value))} required />

          <label style={styles.label}>Draw Date:</label>
          <input style={styles.input} type="date" value={drawDate} onChange={e => setDrawDate(e.target.value)} required />

          <button type="submit" style={styles.button}>Save Competition</button>
        </form>

        <button
          onClick={() => {
            localStorage.removeItem('admin-auth');
            router.push('/admin/login');
          }}
          style={styles.logout}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f8f9fa',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  },
  card: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '600px',
  },
  heading: {
    marginBottom: '1.5rem',
    fontSize: '1.75rem',
    textAlign: 'center' as const,
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    width: '100%',
  },
  button: {
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
    marginTop: '1rem',
  },
  logout: {
    marginTop: '2rem',
    textAlign: 'center' as const,
    backgroundColor: '#eee',
    padding: '0.5rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    width: '100%',
  },
};
