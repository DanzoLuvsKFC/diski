import { useParams } from 'react-router-dom';

export default function CourtDetails() {
  const { id } = useParams();

  return (
    <div>
      <h1>Court Details (ID: {id})</h1>
      <p>Details for this court will appear here.</p>
    </div>
  );
}