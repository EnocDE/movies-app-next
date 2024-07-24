import { MenuSelectionType } from "@/types/menu-selection";
import { Dispatch, SetStateAction } from "react";

interface MenuSelectionHeaderProps {
  setOptionState: Dispatch<SetStateAction<string>>;
  optionState: string;
  menuSelectionData: MenuSelectionType[];
}

export default function MenuSelectionHeader(props: MenuSelectionHeaderProps) {
  const { setOptionState, optionState, menuSelectionData } = props;

  const handleSetOption = (value: string) => setOptionState(value);
  return (
    <div>
      <header className="mx-auto max-w-[80%] flex gap-10 justify-evenly md:justify-between items-center border-b-1 flex-wrap py-10">
        {menuSelectionData.map((selection) => (
          <h3
            key={selection.name}
            className={`hover:cursor-pointer transition-all select-none text-medium ${
              optionState === selection.url
                ? "scale-150 block md:w-fit font-bold"
                : ""
            }`}
            onClick={() => handleSetOption(selection.url)}
          >
            {selection.name}
          </h3>
        ))}
      </header>
    </div>
  );
}
