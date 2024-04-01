import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { FormControl } from "@/app/components/ui/form";

export default function SelectDemo({ data }: { data: any }) {
  // let { data: branches, error } = await supabase.from("branches").select("*");
  const branchesData = [
    {
      id: 1,
      branch_name: "North Road",
      branch_location: "Sta. Rosa St, Dumaguete, 6200 Negros Oriental",
    },
    {
      id: 2,
      branch_name: "Sta. Rosa St.",
      branch_location:
        "North Road, National Highway, Buñao Rd, Dumaguete, Negros Oriental",
    },
  ];

  return (
    <Select onValueChange={data.onChange}>
      <FormControl>
        <SelectTrigger
          id="branch"
          name="branch"
          value={data.value}
          className="w-full bg-lightComponentBg border-slate-600/50 rounded-lg "
        >
          <SelectValue className="text-white" placeholder="Select a branch" />
        </SelectTrigger>
      </FormControl>
      <SelectContent className="rounded-lg bg-lightComponentBg border-slate-600/50 text-white">
        <SelectGroup>
          {branchesData.map((branch) => (
            <SelectItem key={branch.id} value={branch.branch_name}>
              {branch.branch_name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
