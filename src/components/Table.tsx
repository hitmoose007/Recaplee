export default function TablePrimary<T>({
  header,
  row,
  data = [],
}: {
  header: React.ReactNode;
  row: (item: T, index: number) => React.ReactNode;
  data?: T[];
}) {
  return (
    <div className="h-full overflow-clip rounded-xl border-neutral-100 bg-neutral-50 text-black">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-max">
          <thead className="border-b">{header}</thead>
          <tbody>{data.map((item, index) => row(item, index))}</tbody>
        </table>
      </div>
    </div>
  );
}
