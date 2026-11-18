type SubmitButtonProps = {
  isSubmitting: boolean;
  label: string;
  css?: string;
};

const SubmitButton = ({ isSubmitting, label, css = "" }: SubmitButtonProps) => (
  <button
    type="submit"
    disabled={isSubmitting}
    className={`bg-[#0C4039] text-zinc-50 text-sm rounded ${css}`}
  >
    {isSubmitting ? <span className="loading loading-spinner" /> : label}
  </button>
);

export default SubmitButton;
