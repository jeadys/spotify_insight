export default function Content({ children }) {
  return (
    <>
      <div className="flex-1 overflow-hidden">
        <div className="flex-1 p-5 max-w-8xl mx-auto">{children}</div>
      </div>
    </>
  );
}
