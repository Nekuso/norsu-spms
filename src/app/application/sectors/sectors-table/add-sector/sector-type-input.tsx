import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectDemo({ data }: { data: any }) {
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
          placeholder="Select a Sector Type"
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
