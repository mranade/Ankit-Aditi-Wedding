export default function Highlight({ text, query }: any) {
  if (!query) return <span>{text}</span>;

  const regex = new RegExp(`(${query})`, 'i');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part: string, i: number) =>
        regex.test(part) ? (
          <mark key={i} style={{ background: '#ffe58f' }}>{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}