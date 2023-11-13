import React from "react";
import DateInput from "./DateInput";
import SelectInput from "./SelectInput";

const FilterArea = () => {
  return (
    <div className="m-4  p-4 flex flex-col md:flex-row items-center justify-center md:space-x-2 space-y-2 md:space-y-0">
      <DateInput />
      <SelectInput />
    </div>
  );
};

export default FilterArea;
