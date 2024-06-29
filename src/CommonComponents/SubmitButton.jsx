import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
const SubmitButton = ({ children, type, color }) => {
  return (
    // <button type={type} className={`  bg-${color}   w-full  flex  justify-center p-2 shadow-lg rounded-md` }  >
    //   {children}
    // </button>
        <Button className={` text-${color}  ` } type="primary" htmlType={type} size='large'>{children}</Button>

  );
};

SubmitButton.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  color: PropTypes.string
};

export default SubmitButton;
