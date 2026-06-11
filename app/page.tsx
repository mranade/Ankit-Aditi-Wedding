import SearchBar from '../components/SearchBar';

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5efd6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    }}>
      <div style={{ width: '100%', maxWidth: 600 }}>
        <h1 style={{ textAlign: 'center', fontSize: 40 }}>
          Ankit and Aditi's Wedding Photo Finder
        </h1>
        <p style={{ textAlign: 'center', color: '#666' }}>
          Type your name to find your photo groups
        </p>
        <SearchBar />
      </div>
    </div>
  );
}