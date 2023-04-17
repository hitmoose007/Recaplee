export default function Page({
  children,
  title = "Page",
  description = "Page Description",
  actions = null,
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <section className="flex h-full w-full flex-col overflow-hidden py-10">
      <div className="container mx-auto px-4">
        <div className="mb-2 flex justify-between">
          <h1 className="mb-1 text-xl font-semibold text-black">{title}</h1>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
        <p className="text-sm text-neutral-500">{description}</p>
      </div>
      <div className="container mx-auto mt-4 flex-1 px-4">{children}</div>
    </section>
  );
}
