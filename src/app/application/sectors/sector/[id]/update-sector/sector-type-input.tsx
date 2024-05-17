import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectDemo({ data }: { data: any }) {
  const sectorType = [
    {
      value: "Department",
      label: "Department",
    },
    {
      value: "Office",
      label: "Office",
    },
  ];

  function findSector(idString: any) {
    const id = idString;

    const foundItem = sectorType.find((item: any) => item.value === id);

    if (foundItem) {
      return foundItem.value;
    } else {
      return "Sector not found";
    }
  }

  return (
    <Select onValueChange={data.onChange}>
      <SelectTrigger
        id="sector_type"
        name="sector_type"
        className="w-full bg-white border-slate-600/50 rounded-lg "
        {...data}
      >
        <SelectValue
          className="text-white"
          placeholder={data ? findSector(data.value) : "Select a sector"}
        />
      </SelectTrigger>
      <SelectContent className="rounded-lg bg-white border-slate-600/50 text-black">
        <SelectGroup>
          <SelectItem value="Department">Department</SelectItem>
          <SelectItem value="Office">Office</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
