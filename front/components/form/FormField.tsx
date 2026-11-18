import { Field } from 'formik';

type FormFieldProps = {
  name: string;
  type: string;
  placeholder: string;
  label?: string;
  css?: string;
};

const FormField =  ({ name, type, placeholder, label, css="" }: FormFieldProps) => {
  return (
    <Field name={name}>
      {({ field, meta }) => (
        <div className={`${css}`}>
          {label && (
            <label
              htmlFor={name}
              className="text-xs font-semibold text-base-content/70 uppercase tracking-wide"
            >
              {label}
            </label>
          )}
          <input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            className={`input w-full ${css} ${meta.touched && meta.error ? 'border-error' : 'border-base-300'}`}
          />
          {meta.touched && meta.error && (
            <span className="text-xs text-error">{meta.error}</span>
          )}
        </div>
      )}
    </Field>
  );
};

export default FormField;
