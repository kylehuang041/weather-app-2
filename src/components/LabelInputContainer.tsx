import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const LabelInputContainer = ({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange?: (e: any) => void;
  className?: string;
}) => {
  const lowerCaseValue = value.toLowerCase();
  const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);

  return (
    <div>
      <Label htmlFor={lowerCaseValue} className="text-white">
        {capitalizedValue}
      </Label>
      <Input name={lowerCaseValue} className={className} onChange={onChange} id={lowerCaseValue} placeholder={capitalizedValue} type="text" />
    </div>
  );
};

export default LabelInputContainer;