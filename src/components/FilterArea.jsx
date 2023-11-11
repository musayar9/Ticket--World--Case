import React from "react";
import DateInput from "./DateInput";
import SelectInput from "./SelectInput";

const FilterArea = () => {
  return (
    <div className="m-4 mr-20 p-4 flex items-center justify-end space-x-2">
      <DateInput />
      <SelectInput />
    </div>
  );
};

export default FilterArea;
