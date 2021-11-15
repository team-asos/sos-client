import React, { useState } from 'react';
import '../assets/styles/a5_floorModal.css';

import { Modal } from 'react-bootstrap';
import CreateFloor from './a5_createFloor';
import DeleteFloor from './a5_deleteFloor';

import {
  Radio,
  FormControl,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';

import { red } from '@mui/material/colors';

function FloorModalDemo({ show, handleClose }) {
  const [selectedValue, setSelectedValue] = useState('create');
  const handleChange = event => {
    setSelectedValue(event.target.value);
  };

  const controlProps = item => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="floorModalSelect">
            <div style={{ fontWeight: 'bolder' }}>층 편집</div>

            <FormControl component="fieldset">
              <RadioGroup
                value={selectedValue}
                onChange={handleChange}
                sx={{ display: 'flex', flexDirection: 'row' }}
              >
                <FormControlLabel
                  value="create"
                  control={
                    <Radio
                      size="small"
                      {...controlProps('create')}
                      sx={{
                        color: red[900],
                        '&.Mui-checked': {
                          color: red[900],
                        },
                      }}
                    />
                  }
                  label="층 생성"
                />
                <FormControlLabel
                  value="delete"
                  control={
                    <Radio
                      size="small"
                      {...controlProps('delete')}
                      sx={{
                        color: red[900],
                        '&.Mui-checked': {
                          color: red[900],
                        },
                      }}
                    />
                  }
                  label="층 삭제"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </Modal.Title>
      </Modal.Header>
      {selectedValue === 'create' ? <CreateFloor /> : <DeleteFloor />}
    </Modal>
  );
}
export default FloorModalDemo;
