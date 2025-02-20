export default function AccordionItem({
  header,
  border,
  children,
}: {
  header: React.ReactNode;
  border: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={
        "collapse collapse-arrow bg-base-200 mb-2" +
        (border ? " border border-neutral-400" : "")
      }
    >
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">{header}</div>
      <div className="collapse-content">{children}</div>
    </div>
  );
}
