import { Checkbox } from 'antd';
import PropTypes from 'prop-types';

const CheckBox = ({ value }) => {
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <Checkbox className='text-white' onChange={onChange}>{value}</Checkbox>
  );
}

CheckBox.propTypes = {
  value: PropTypes.string.isRequired
};

export default CheckBox;
