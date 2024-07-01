import { Checkbox } from 'antd';

const CheckBox = ({value}) => {
    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
      };
      
  return (
<Checkbox className='text-white' onChange={onChange}>{value}</Checkbox>
  )
}

export default CheckBox