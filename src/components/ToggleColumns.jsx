import { Button, ClickAwayListener, FormControlLabel, FormGroup, Switch } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import styled from 'styled-components';

const MenuContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  border-radius: 4px;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  width: 720px;
  >*{
    width: 25%;
  }
`;

const MenuItem = styled(FormGroup)`
  padding: 5px;
  cursor: pointer;
  >label{
    text-transform: uppercase;
    margin: 0;
  }
`;


function ToggleColumns({ colDef, columnApi }) {
  const [isOpen, setIsOpen] = useState(false);
  const [columns, setColumns] = useState([])
  useEffect(() => {
    if(!columnApi) return
    setColumns(colDef?.map(e => {
        return columnApi.current?.columnApi?.getColumn(e.field)
    }))
  },[colDef, columnApi])

  

  const toggleColumnVisibility = (index) => {
    setColumns(prevColumns => {
      const newColumns = [...prevColumns];
      newColumns[index] = {
        ...newColumns[index],
        visible: !newColumns[index].visible,
      };
      return newColumns;
    });
    const column = columnApi.current?.columnApi?.getColumn(columns[index].colId);
    if (column) {
    columnApi.current?.columnApi?.setColumnVisible(column, !column.visible);
    }
  };

  const menuItems = columns?.map((col, i) => (
    <MenuItem key={col?.colId}>
      <FormControlLabel control={<Switch checked={col?.visible} onChange={() => toggleColumnVisibility(i)}/>} label={col?.colId}/>
    </MenuItem>
  ));

  return (
    <ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={() => setIsOpen(false)}>
        <MenuContainer>
            <div className='iconWrapper' onClick={() => setIsOpen(p => !p)}>
                <ViewColumnIcon/>
            </div>
            {isOpen && <DropdownMenu>{menuItems}</DropdownMenu>}
        </MenuContainer>
    </ClickAwayListener>
  );
}




export default ToggleColumns;

