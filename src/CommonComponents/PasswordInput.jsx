import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Input, Space } from "antd";
import { Controller } from "react-hook-form";

import { Typography } from "antd";
const { Text } = Typography;

const PasswordInput = ({ name, placeholder, control, rules, icon }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <Controller
      control={control}
      name={name}

      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <>
          <div className="password-input-wrapper">
              <Input.Password
                {...field}
                placeholder={placeholder}
                type={passwordVisible ? "text" : "password"}
                size="large"
                prefix={icon}
                status={error ? "error" : null}
                visibilityToggle={{
                    visible: passwordVisible,
                    onVisibleChange: setPasswordVisible,
                  }}
                />
              {/* <Button
                style={{ width: 80 }}
                size="large"
                status={error ? "error" : null}
                onClick={() => setPasswordVisible((prevState) => !prevState)}
              >
                {passwordVisible ? "Hide" : "Show"}
              </Button> */}
          </div>
          <div>
            {error && (
              <Text type="danger" className="w-full">
                {error.message}
              </Text>
            )}
          </div>
        </>
      )}
    />
  );
};

PasswordInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  control: PropTypes.object.isRequired,
  rules: PropTypes.object,
};

export default PasswordInput;
