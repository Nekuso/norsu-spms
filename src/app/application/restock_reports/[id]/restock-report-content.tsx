export default function UserContent({ restockReport }: any) {
  console.log(restockReport);
  return (
    <div className="w-full h-[805px] 2xl:h-[882px] flex flex-col max-w-[1840px] justify-center place-items-center gap-7 py-4 overflow-scroll">
      <pre>
        <code>{JSON.stringify(restockReport, null, 2)}</code>
      </pre>
    </div>
  );
}
