export default function FullField({
  label,
  name,
  register,
  required,
  ...props
}) {
  return (
    <div className="grid grid-cols-3">
      <div className="col-span-1">
        <label>{label}</label>
      </div>
      <div className="col-span-2">
        <input
          {...props}
          {...register(name, { required })}
          className="w-full"
        />
      </div>
    </div>
  );
}
