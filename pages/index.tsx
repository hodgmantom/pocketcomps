import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>PocketComps | Your Favourite Pokemon Giveaways</title>
        <meta name="description" content="Win amazing prizes by answering trivia questions. No luck, just skill!" />
      </Head>

      <header style={styles.header}>
        <h1 style={styles.logo}>PocketComps</h1>
        <nav>
          <Link href="/">Home</Link> |{' '}
          <Link href="/about">About</Link> |{' '}
          <Link href="/faq">FAQ</Link>
        </nav>
      </header>

      <main style={styles.main}>
        <section style={styles.hero}>
          <h2>Win Prizes with Your Knowledge</h2>
          <p>Answer skill-based questions to enter. No gambling, just fun!</p>
          <Link href="/competitions">
            <button style={styles.button}>View Competitions</button>
          </Link>
        </section>

        <section>
          <h3>Live Draw Coming Soon</h3>
          <p>Stay tuned for our first competition draw!</p>
        </section>
      </main>

      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} PocketComps Ltd. All rights reserved.</p>
      </footer>
    </>
  );
}

const styles = {
  header: {
    padding: '1rem',
    borderBottom: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    margin: 0,
    fontSize: '1.5rem',
  },
  main: {
    padding: '2rem',
    textAlign: 'center' as const,
  },
  hero: {
    marginBottom: '3rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
  },
  footer: {
    textAlign: 'center' as const,
    padding: '1rem',
    borderTop: '1px solid #eee',
    marginTop: '3rem',
  },
};
