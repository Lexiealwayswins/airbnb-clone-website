"use client";

import { useCountries } from "@/hook/useCountries";
import Select from "react-select";
import Flag from "react-world-flags";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
}

type Props = {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}
export const CountrySelect = ({value, onChange}: Props) => {
  const { getAll } = useCountries();
  return (
    <div className="pb-1">
      <Select
        onChange={(value) => onChange(value as CountrySelectValue)}
        value={value}
        placeholder="Search destinations"
        isClearable
        options={getAll()}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3 text-md">
            <Flag code={option.value} className="w-5"/>
            <div>
              {option.label},
              <span className="text-gray-400 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        styles={{
          control: (provided) => ({
            ...provided,
            border: "none",
            boxShadow: "none", 
            backgroundColor: "transparent", // 移除背景
            height: "20px",
            minHeight: "20px",
            width: "150px",
            textAlign: "left",
          }),
          placeholder: (provided) => ({
            ...provided,
            color: "#9CA3AF",
          }),
          input: (provided) => ({
            ...provided,
            padding: "0px",
            margin: "0px",
          }),
          singleValue: (provided) => ({
            ...provided,
            position: "absolute",
            top: "0px",
            color: "#9CA3AF",
            overflow: "hidden"
          }),
          indicatorSeparator: () => ({
            display: "none", // 隐藏分隔线
          }),
          dropdownIndicator: () => ({
            display: "none", // 隐藏下拉箭头
          }),
          clearIndicator: (provided) => ({
            ...provided,
            padding: "0px",
            position: "absolute",
            right: "-3px", 
            top: "3px"
          }),
          menu: (provided) => ({
            ...provided,
            width: "500px", // 设定下拉菜单宽度
            minWidth: "300px", // 避免被默认样式影响
            marginTop: "20px",
            marginLeft: "-10px"
          }),
          valueContainer: (provided) => ({
            ...provided,
            padding: "0px", // 这个默认会有 padding，必须手动设为 0
            margin: "0px"
          }),
        }}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: "none",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
};