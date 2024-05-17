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

export default function SelectDemo({ data, form, sectors }: any) {
  function findRoleById(idString: any) {
    const id = parseInt(idString);

    const foundItem = sectors.find((item: any) => item.id === id);

    if (foundItem) {
      return foundItem.role;
    } else {
      return "Role not found";
    }
  }

  return (
    <Select
      onValueChange={
        form.watch("role") === "4" ||
        form.watch("role") === "2" ||
        form.watch("role") === "3"
          ? ""
          : data.onChange
      }
      value={
        form.watch("role") === "4" ||
        form.watch("role") === "2" ||
        form.watch("role") === "3"
          ? ""
          : data.value
      }
      disabled={
        form.watch("role") === "4" ||
        form.watch("role") === "2" ||
        form.watch("role") === "3"
          ? true
          : false
      }
    >
      <FormControl>
        <SelectTrigger
          id="sector"
          name="sector"
          value={data.value}
          className="w-full border-slate-600/50 rounded-lg "
        >
          <SelectValue
            className=""
            placeholder={data ? findRoleById(data.value) : "Select a role"}
          />
        </SelectTrigger>
      </FormControl>
      <SelectContent className="rounded-lg border-slate-600/50 ">
        <SelectGroup>
          {sectors.map((sector: any) => (
            <SelectItem key={sector.id} value={sector.id.toString()}>
              {sector.sector_name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
