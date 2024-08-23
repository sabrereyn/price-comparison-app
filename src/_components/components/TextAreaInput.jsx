import FullField from "./FullField";

export default function TextAreaInput({ label, required, name, register }) {
  return (
    <FullField label={label}>
      <textarea
        {...register(name, { required })}
        className="w-full"
        rows={5}
        cols={30}
      />
    </FullField>
  );
}
