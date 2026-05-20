export default function Products() {
  return (
    <div style={{
      minHeight: '100vh',
      paddingTop: 'var(--navbar-height)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg)'
    }}>
      <h1 style={{ fontSize: '40px', fontWeight: 800, color: 'var(--secondary)' }}>
        Products Page
      </h1>
    </div>
  );
}
