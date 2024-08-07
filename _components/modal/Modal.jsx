export default function Modal({ children }) {
  return (
    <div className="modal min-w-48 mx-auto bg-slate-700 rounded-xl p-6 md:w-96 grid grid-cols-none gap-4">
      {children}
    </div>
  );
}
