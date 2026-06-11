import people from '../../../data/people.json';

export default function GroupPage({ params }: any) {
  const name = decodeURIComponent(params.id);

  const person = (people as any).find((p:any) => p.name === name);

  if (!person) return <div style={{ padding: 40 }}>Not found</div>;

  return (
    <div style={{ padding: 40 }}>
      <h1>{person.name}</h1>

      <h3>Photo Groups</h3>

      <div style={{ display: 'grid', gap: 12 }}>
        {person.groups.map((g: string, i: number) => (
          <div key={i} style={{
            padding: 16,
            border: '1px solid #ddd',
            borderRadius: 12
          }}>
            📸 {g}
          </div>
        ))}
      </div>
    </div>
  );
}