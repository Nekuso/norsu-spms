import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

export default function SelectDemo({ data }: { data: any }) {
  return (
    <Select>
      <SelectTrigger
        id="gender"
        name="gender"
        className="w-full bg-lightComponentBg border-slate-600/50 rounded-lg "
        {...data}
      >
        <SelectValue className="text-white" placeholder="Select a Gender" />
      </SelectTrigger>
      <SelectContent className="rounded-lg bg-lightComponentBg border-slate-600/50 text-white">
        <SelectGroup>
          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="female">Female</SelectItem>
          <SelectItem value="gay">Gay</SelectItem>
          <SelectItem value="femboy">FemBoy</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
