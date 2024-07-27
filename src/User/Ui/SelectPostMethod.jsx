


const SelectPostMethod = ({setValue, value, options}) => {

  const onChange = (value) => {
    setValue(value);
  };

  return (
    <div className="infinite-scroll-container h-fit flex py-4  ">
      <div className="flex gap-3 whitespace-nowrap">
        {options.map((option, index) => (
          <div
            onClick={() => onChange(option.value)}
            key={index}
            className={`cursor-pointer rounded-full flex justify-center items-center transition-all duration-300 ${
              value === option.value ? 'bg-white shadow-lg text-black  border border-blue-600   h-9 w-20' : 'border  h-8 w-16'
            }`}
          >
            <h2 className="text-sm">{option.label}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectPostMethod;
