import FullField from "./FullField";

export default function Input({
  label,
  required = false,
  name,
  register,
  ...props
}) {
  return (
    <FullField label={label}>
      <input {...register(name, { required })} className="w-full" {...props} />
    </FullField>
  );
}
