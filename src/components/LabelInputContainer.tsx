/**
 * @brief Input + Label Wrapper
 * @author Kyle Huang
 * @date 8/28/2024
 * @version 0.1
 */

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

/**
 * @brief Input + Label Wrapper
 * @param name Name of the input
 * @param onChange Change event handler
 * @param className Class name for the input
 * @param placeholder Placeholder for the input
 * @param value Value of the input
 * @param type Type of the input
 * @return JSX.Element
 */
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