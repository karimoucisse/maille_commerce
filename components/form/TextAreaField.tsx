import { Field } from "formik";

type TextAreaFieldProps = {
  name: string;
  type: string;
  placeholder: string;
  label?: string;
  css?: string;
};
// Reusable Formik field component that can be used across different forms in the application
const TextAreaField = ({
  name,
  type,
  placeholder,
  label,
  css = "",
}: TextAreaFieldProps) => {
  return (
    <Field name={name}>
      {({ field, meta }) => (
        <div className={`${css} w-full`}>
          {label && (
            <label
              htmlFor={name}
              className="text-xs font-semibold text-base-content/70 uppercase tracking-wide"
            >
              {label}
            </label>
          )}
          <textarea
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            className={`textarea w-full ${css} ${meta.touched && meta.error ? "border-error" : "border-base-300"}`}
          ></textarea>
          {/* <input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            className={`input w-full ${css} ${meta.touched && meta.error ? "border-error" : "border-base-300"}`}
          /> */}
          {meta.touched && meta.error && (
            <span className="text-xs text-error">{meta.error}</span>
          )}
        </div>
      )}
    </Field>
  );
};

export default TextAreaField;
