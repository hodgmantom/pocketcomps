import { useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/AdminLayout';
import AdminHeader from '@/components/AdminHeader';

export default function CreateCompetitionPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [question, setQuestion] = useState('');
  const [answerOptions, setAnswerOptions] = useState(['', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(null);
  const [tickets, setTickets] = useState(0);
  const [price, setPrice] = useState(0);
  const [drawDate, setDrawDate] = useState('');
  const [drawTime, setDrawTime] = useState('');

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
        alert('Upload failed. Check console for details.');
        console.error('Upload error:', data);
      }
    } catch (error) {
      alert('Image upload failed. Please try again.');
      console.error('Network error:', error);
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
      drawDate: `${drawDate}T${drawTime}`,
    };

    const existing = JSON.parse(localStorage.getItem('competitions') || '[]');
    const updated = [...existing, compData];
    localStorage.setItem('competitions', JSON.stringify(updated));

    alert('Competition saved!');
    router.push('/admin/dashboard');
  };

  return (
    <AdminLayout>
      <div style={styles.container}>
        <AdminHeader title="Create a New Competition" subtitle="Fill in all required fields below." />

        <div style={styles.card}>
          <div style={styles.infoBox}>
            <p>
              <strong>Tip:</strong> Use a clear image, make the trivia question fair,
              and double-check the draw date before publishing!
            </p>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label}>Competition Title</label>
            <input
              style={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g. Win a Charizard Card"
              required
            />

            <label style={styles.label}>Prize Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={styles.inputFile}
            />

            {image && (
              <div style={styles.imagePreview}>
                <img src={image} alt="Preview" style={{ width: '100%', height: 'auto' }} />
              </div>
            )}

            <label style={styles.label}>Trivia Question</label>
            <input
              style={styles.input}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="E.g. What type is Charizard?"
              required
            />

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

            <label style={styles.label}>Total Tickets</label>
            <input
              style={styles.input}
              type="number"
              value={tickets}
              onChange={(e) => setTickets(Number(e.target.value))}
              required
            />

            <label style={styles.label}>Price per Ticket (£)</label>
            <input
              style={styles.input}
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />

            <label style={styles.label}>Draw Date</label>
            <input
              style={styles.input}
              type="date"
              value={drawDate}
              onChange={(e) => setDrawDate(e.target.value)}
              required
            />

            <label style={styles.label}>Draw Time</label>
            <input
              style={styles.input}
              type="time"
              value={drawTime}
              onChange={(e) => setDrawTime(e.target.value)}
              required
            />

            <button type="submit" style={styles.button}>Save Competition</button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

const styles = {
  container: {
    padding: '1rem',
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
  },
  card: {
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: '12px',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
    maxWidth: '700px',
    margin: '0 auto',
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
    width: '100%',
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
    flexWrap: 'wrap' as const,
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    fontWeight: 'normal',
    fontSize: '0.9rem',
  },
};
