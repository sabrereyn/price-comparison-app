export default function FullField({ label, children }) {
  return (
    <div className="grid grid-cols-3">
      <div className="col-span-1">
        <label>{label}</label>
      </div>
      <div className="col-span-2">{children}</div>
    </div>
  );
}
