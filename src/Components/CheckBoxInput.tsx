
interface customProps {
  text: any;
  setIsChecked: any;
  isChecked: any;
}

const CheckBoxInput: React.FC<customProps> = ({
  text,
  setIsChecked,
  isChecked,
}) => {
  // Function to handle the checkbox change
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked); // Update the state with the checkbox's value
    console.log(
      event.target.checked ? "Checkbox is checked" : "Checkbox is unchecked"
    );
  };

  return (
    <label className="custom-checkbox flex items-center">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <span className="checkmark"></span>
      <div className="ps-3 text-gray-700 text-[.9rem]">{text}</div>
    </label>
  );
};

export default CheckBoxInput;
