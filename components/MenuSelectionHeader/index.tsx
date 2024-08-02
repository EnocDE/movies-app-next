import { MenuSelectionType } from "@/types/menu-selection";
import { Dispatch, SetStateAction } from "react";

interface MenuSelectionHeaderProps {
  setOptionState: Dispatch<SetStateAction<MenuSelectionType["type"]>>;
  optionState: MenuSelectionType["type"];
  menuSelectionData: MenuSelectionType[];
}

export default function MenuSelectionHeader(props: MenuSelectionHeaderProps) {
  const { setOptionState, optionState, menuSelectionData } = props;

  const handleSetOption = (value: MenuSelectionType["type"]) => setOptionState(value);
  return (
    <div>
      <header className="mx-auto max-w-[80%] flex gap-10 justify-evenly items-center border-b-1 flex-wrap py-10">
        {menuSelectionData.map((selection) => (
          <h3
            key={selection.name}
            className={`hover:cursor-pointer transition-all select-none text-medium ${
              optionState === selection.type
                ? "scale-150 block md:w-fit font-bold"
                : ""
            }`}
            onClick={() => handleSetOption(selection.type)}
          >
            {selection.name}
          </h3>
        ))}
      </header>
    </div>
  );
}
