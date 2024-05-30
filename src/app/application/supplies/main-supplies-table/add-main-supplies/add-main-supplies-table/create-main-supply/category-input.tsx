import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl } from "@/components/ui/form";
import { useSelector } from "react-redux";

export default function SelectDemo({ data }: { data: any }) {
  const supplyCategoriesData = useSelector(
    (state: any) => state.supplyCategories
  );

  return (
    <Select onValueChange={data.onChange} value={data.value}>
      <FormControl>
        <SelectTrigger
          id="uom_id"
          name="uom_id"
          value={data.value}
          className="w-full  border-slate-600/50 rounded-lg "
        >
          <SelectValue className="text-white" placeholder="Select a category" />
        </SelectTrigger>
      </FormControl>
      <SelectContent className="rounded-lg border-slate-600/50 text-black">
        <SelectGroup>
          {supplyCategoriesData.map((category: any) => (
            <SelectItem key={category.id} value={category.id.toString()}>
              {category.value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
