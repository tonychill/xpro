import { FC, ChangeEvent } from "react";

interface FormInputFieldProps {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const FormInputField: FC<FormInputFieldProps> = ({ name, type, placeholder, className, label, onChange }) => {
  return (
    <div className={className ? className : "w-full md:w-1/2 px-3"}>
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
        {label}
      </label>
      <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        // id="grid-last-name"
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={(event) => onChange(event)}
      />
    </div>
  );
};

export default FormInputField;

/*** Notes ***
 * Notes go here.
 */
