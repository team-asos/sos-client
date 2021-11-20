import React, { useState } from 'react';

import './index.scss';

import { Modal } from 'react-bootstrap';
import { CreateFloor } from './CreateFloorPane';
import { DeleteFloor } from './DeleteFloorPane';

import {
  Radio,
  FormControl,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';

import { red } from '@mui/material/colors';

export const FloorModal = ({ show, toggleModal }) => {
  const [selectedValue, setSelectedValue] = useState(0);

  const handleChange = event => {
    setSelectedValue(Number(event.target.value));
  };

  return (
    <Modal show={show} onHide={toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="floor-modal-select">
            <div style={{ fontWeight: 'bolder' }}>층 관리</div>

            <FormControl component="fieldset">
              <RadioGroup
                aria-label="option"
                value={selectedValue}
                onChange={handleChange}
                sx={{ display: 'flex', flexDirection: 'row' }}
              >
                <FormControlLabel
                  value={0}
                  control={
                    <Radio
                      size="small"
                      sx={{
                        color: red[900],
                        '&.Mui-checked': {
                          color: red[900],
                        },
                      }}
                      checked={selectedValue === 0}
                      onChange={handleChange}
                      value={0}
                      name="radio-buttons"
                      inputProps={{ 'aria-label': 0 }}
                    />
                  }
                  label="층 생성"
                />
                <FormControlLabel
                  value={1}
                  control={
                    <Radio
                      size="small"
                      sx={{
                        color: red[900],
                        '&.Mui-checked': {
                          color: red[900],
                        },
                      }}
                      checked={selectedValue === 1}
                      onChange={handleChange}
                      value={1}
                      name="radio-buttons"
                      inputProps={{ 'aria-label': 1 }}
                    />
                  }
                  label="층 삭제"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </Modal.Title>
      </Modal.Header>
      {selectedValue === 0 ? <CreateFloor /> : <DeleteFloor />}
    </Modal>
  );
};
