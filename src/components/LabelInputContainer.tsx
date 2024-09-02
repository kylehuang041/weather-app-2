import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const LabelInputContainer = ({
  name,
  onChange,
  className,
  placeholder,
  value,
  type
}: {
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
  value: string;
  type?: string;
}) => {
  const lowerCaseName = name.toLowerCase();
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div>
      <Label htmlFor={lowerCaseName} className="text-white">
        {capitalizedName}
      </Label>
      <Input type={type} value={value} placeholder={placeholder || capitalizedName} name={lowerCaseName} className={className} onChange={onChange} id={lowerCaseName} />
    </div>
  );
};

export default LabelInputContainer;