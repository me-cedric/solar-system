export default function AccordionItem({
  header,
  border,
  margin,
  children,
}: {
  header: React.ReactNode;
  border: boolean;
  margin?: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className={
        "collapse collapse-arrow bg-base-200" +
        (margin ? " mb-" + margin : "") +
        (border ? " border border-neutral-400" : "")
      }
    >
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">{header}</div>
      <div className="collapse-content">{children}</div>
    </div>
  );
}
