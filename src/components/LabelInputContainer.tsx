import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const LabelInputContainer = ({
  value,
  onChange,
  className,
  placeholder
}: {
  value: string;
  onChange?: (e: any) => void;
  className?: string;
  placeholder?: string;
}) => {
  const lowerCaseValue = value.toLowerCase();
  const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);

  return (
    <div>
      <Label htmlFor={lowerCaseValue} className="text-white">
        {capitalizedValue}
      </Label>
      <Input placeholder={placeholder || capitalizedValue} name={lowerCaseValue} className={className} onChange={onChange} id={lowerCaseValue} type="text" />
    </div>
  );
};

export default LabelInputContainer;