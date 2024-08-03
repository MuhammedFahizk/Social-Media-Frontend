import React, { useEffect, useState } from "react";
import { MdOutlineClear } from "react-icons/md";
import PropTypes from 'prop-types';
import { Button, Input, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ConnectionModal from './ConnectionModal';
import ConnectionSearch from "./ConnectionSearch";

const ButtonElem = ({ type, id, length }) => {
  const [totalCount, setTotalCount] = useState(length);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);

  const showModal = () => { 
    setIsModalOpen(true);
    setOffset(0);
    setData([]);
  };

  const handleCancel = () => setIsModalOpen(false);

  useEffect(() => {
    setTotalCount(length);
    setSearch('');
    setOffset(0);
    setData([]);
  }, [id]);

  const handleClear = () => {
    setSearch('');
    setOffset(0);
    setData([]);
  };

  return (
    <>
      <Button onClick={showModal} className="bg-white px-2 text-xs font-Jakarta text-black p-1 rounded-md shadow-sm md:shadow-lg">
        {type === "followers" ? `Followers ${totalCount}` : `Followings ${totalCount}`}
      </Button>
      <Modal title="Connections" open={isModalOpen} onOk={handleCancel} onCancel={handleCancel}>
        <Input
          placeholder="Search for connections"
          suffix={<MdOutlineClear onClick={handleClear} className="cursor-pointer" />}
          prefix={<SearchOutlined />}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setOffset(0);
          }}
        />
        {search ? (
          <ConnectionSearch
            search={search}
            id={id}
            length={length}
            offset={offset}
            setOffset={setOffset}
            type={type}
          />
        ) : (
          <ConnectionModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            type={type}
            setTotalCount={setTotalCount}
            totalCount={totalCount}
            id={id}
            data={data}
            setOffset={setOffset}
            offset={offset}
            setData={setData}
            length={length}
          />
        )}
      </Modal>
    </>
  );
};

ButtonElem.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
};

export default ButtonElem;
