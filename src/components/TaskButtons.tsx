import { FaPencilAlt, FaRegTrashAlt, FaCheck } from "react-icons/fa";
import CustomButton from "./CustomButton";

type TaskButtonsProps = {
  onEdit: () => void;
  onDelete: () => void;
  onComplete: () => void;
  isDisabled?: boolean;  
};
export default function TaskButtons({
  onEdit,
  onDelete,
  onComplete,
  isDisabled,
  className
}: TaskButtonsProps & {className?:string}) {
  return (
    <div className={`flex flex-row-reverse gap-2 mx-2 h-10 ${className || ""}`}>
      <CustomButton onClick={onComplete} icon={FaCheck} disabled={isDisabled} tooltip="complete" />
      <CustomButton
        onClick={onDelete}
        icon={FaRegTrashAlt}
        disabled={isDisabled}
        tooltip="delete"
      />      
      <CustomButton onClick={onEdit} icon={FaPencilAlt} disabled={isDisabled} tooltip="edit"/>
    </div>
  );
}
