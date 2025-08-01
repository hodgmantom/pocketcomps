import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminPage() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [question, setQuestion] = useState('');
  const [answerOptions, setAnswerOptions] = useState(['', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(null);

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
    formData.append('upload_preset', 'pocketcomps_upload');

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dcartbpho/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setImage(data.secure_url);
      } else {
        console.error('Upload error:', data);
        alert('Upload failed. Check console for details.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Image upload failed. Please try again.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
 const compData = {
  title,
  image,
  question,
  answers: answerOptions,
  correctAnswer: answerOptions[correctAnswerIndex ?? 0],
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
      <div style={styles.header}>
        <h1>PocketComps Admin</h1>
        <button onClick={() => {
          localStorage.removeItem('admin-auth');
          router.push('/admin/login');
        }} style={styles.logout}>Logout</button>
      </div>

      <div style={styles.card}>
        <h2 style={styles.heading}>Create a New Competition</h2>

        <div style={styles.infoBox}>
          <p><strong>Tip:</strong> Use a clear image, make the trivia question fair, and double-check the draw date before publishing!</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Competition Title</label>
          <input style={styles.input} value={title} onChange={e => setTitle(e.target.value)} placeholder="E.g. Win a Charizard Card" required />

          <label style={styles.label}>Prize Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} style={styles.inputFile} />

          {image && (
            <div style={styles.imagePreview}>
              <img src={image} alt="Preview" />
            </div>
          )}

          <label style={styles.label}>Trivia Question</label>
          <input style={styles.input} value={question} onChange={e => setQuestion(e.target.value)} placeholder="E.g. What type is Charizard?" required />

<label style={styles.label}>Answer Options</label>
{answerOptions.map((opt, i) => (
  <div key={i} style={styles.answerRow}>
    <input
      type="text"
      value={opt}
      onChange={(e) => {
        const newOptions = [...answerOptions];
        newOptions[i] = e.target.value;
        setAnswerOptions(newOptions);
      }}
      style={{ ...styles.input, flex: 1 }}
      placeholder={`Answer ${i + 1}`}
      required
    />
    <label style={styles.radioLabel}>
      <input
        type="radio"
        name="correctAnswer"
        checked={correctAnswerIndex === i}
        onChange={() => setCorrectAnswerIndex(i)}
        required
      />
      Correct
    </label>
  </div>
))}

          <div style={styles.row}>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Total Tickets</label>
              <input style={styles.input} type="number" value={tickets} onChange={e => setTickets(Number(e.target.value))} required />
            </div>
            <div style={{ flex: 1, marginLeft: '1rem' }}>
              <label style={styles.label}>Price per Ticket (£)</label>
              <input style={styles.input} type="number" value={price} onChange={e => setPrice(Number(e.target.value))} required />
            </div>
          </div>

          <label style={styles.label}>Draw Date</label>
          <input style={styles.input} type="date" value={drawDate} onChange={e => setDrawDate(e.target.value)} required />

          <button type="submit" style={styles.button}>Save Competition</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  logout: {
    backgroundColor: '#ff4d4f',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  card: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
    maxWidth: '700px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '1.75rem',
    marginBottom: '1rem',
    textAlign: 'center' as const,
  },
  infoBox: {
    backgroundColor: '#e6f7ff',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    border: '1px solid #91d5ff',
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
  },
  inputFile: {
    padding: '0.5rem 0',
  },
  imagePreview: {
    marginTop: '1rem',
    borderRadius: '8px',
    overflow: 'hidden',
    maxHeight: '300px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  row: {
    display: 'flex',
    flexDirection: 'row' as const,
    gap: '1rem',
  },
  button: {
    backgroundColor: '#1890ff',
    color: 'white',
    padding: '0.75rem',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
    marginTop: '1rem',
  },
  answerRow: {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  marginBottom: '0.5rem',
},
radioLabel: {
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
  fontWeight: 'normal',
  fontSize: '0.9rem',
},

};
