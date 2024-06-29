import React from 'react';
import { Controller } from 'react-hook-form';
import { Input as AntdInput } from 'antd';
import PropTypes from 'prop-types';
import { Typography } from "antd";
const { Text } = Typography;


const Input = ({ name, type, placeholder, control, rules, icon }) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <>
          <AntdInput
          className='w-full'
            status= {error? "error"  : null }
            {...field}
            size="large"
            type={type}
            placeholder={placeholder}
            suffix={icon}
          />
          {error && 
          <Text type="danger">{error.message}</Text>
        }

        </>
      )}
    />
  );
};

Input.propTypes   = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  control: PropTypes.object.isRequired,
  rules: PropTypes.object,
  icon: PropTypes.element
  
}
export default Input;
