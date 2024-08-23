export default function Button({ label, onClick }) {
  return (
    <button className="border rounded-lg px-2.5 py-1 text-sm" onClick={onClick}>
      {label}
    </button>
  );
}
