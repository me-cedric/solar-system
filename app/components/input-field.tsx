import { FieldOptions } from "../options";

export function InputField({
  value,
  fieldOptions,
  onChange,
}: {
  key: string;
  value: string | boolean;
  fieldOptions: FieldOptions;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  if (fieldOptions.type === "boolean") {
    return (
      <div className="form-control w-full">
        <label className="label cursor-pointer">
          <span className="label-text">{fieldOptions.label}</span>
          <input
            type="checkbox"
            className="toggle"
            checked={value as boolean}
            onChange={onChange}
            required
          />
        </label>
      </div>
    );
  } else if (fieldOptions.type === "string") {
    return (
      <label className="form-control w-full">
        <div className="label w-full">
          <span className="label-text">{fieldOptions.label}</span>
        </div>
        <input
          type="text"
          placeholder="..."
          value={value.toString()}
          onChange={onChange}
          className="input w-full"
          required
        />
      </label>
    );
  } else if (fieldOptions.type === "image") {
    return (
      <label className="form-control w-full">
        <div className="label w-full">
          <span className="label-text">{fieldOptions.label}</span>
        </div>
        <input
          type="file"
          placeholder="..."
          onChange={onChange}
          className="file-input w-full "
          accept="image/png, image/jpeg"
          required
        />
      </label>
    );
  } else {
    return (
      <label className="form-control w-full">
        <div className="label w-full">
          <span className="label-text">{fieldOptions.label}</span>
        </div>
        <input
          type="number"
          placeholder="..."
          value={value.toString()}
          onChange={onChange}
          className="input w-full"
          required
        />
      </label>
    );
  }
}
