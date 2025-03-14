import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  LabelHTMLAttributes,
} from "react";

export interface InputProps {
  inputProps: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  label?: {
    html: DetailedHTMLProps<
      LabelHTMLAttributes<HTMLLabelElement>,
      HTMLLabelElement
    >;
    children: React.ReactNode;
  };
}

export const InputWithLabel = ({ inputProps, label }: InputProps) => {
  return (
    <div>
      {label && (
        <label
          {...label.html}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label.children}
        </label>
      )}
      <input
        {...inputProps}
        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  );
};
