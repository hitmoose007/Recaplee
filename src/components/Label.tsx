export default function Label({
  children,
  title,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <label>
      <div className="mb-2 text-sm font-semibold">{title}</div>
      <div>{children}</div>
    </label>
  );
}
