import UpdateSectorButton from "./update-sector/update-sector-dialog";
import DeleteSectorButton from "./delete-sector/delete-sector-dialog";

export default function SectorContent({ sector }: any) {
  return (
    <div className="w-full h-[805px] 2xl:h-[882px] flex flex-col max-w-[1840px] justify-center place-items-center gap-7 py-4">
      <pre>
        <code>{JSON.stringify(sector, null, 2)}</code>
      </pre>
      <div className="w-full flex justify-center">
        <UpdateSectorButton sector={sector[0]} />
        <DeleteSectorButton sector={sector[0]} />
      </div>
    </div>
  );
}
