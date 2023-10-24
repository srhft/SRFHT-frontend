import React, {useState} from 'react';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ManualTradeCancel_api } from '../../../API/api';
import MainualTrade from '../MainualTrade';
import { toast } from 'react-toastify';


function ManualTradeActionsCell(props) {
  const { value, data } = props;
  const {setisManualTradeOpen, setselectedRow } = props.myState

  const handleManualTradeCancel = async () => {
    try {
        const res = await ManualTradeCancel_api({ ...data, producttype: data.booktype === 1 ? 'LIMIT' : 'MARKET', qty: 0 })
        toast.success("Trade Cancled successfullt!!")
    } catch (error) {
        console.log(error)
        toast.error("Failed to Cancled Trade!!")
    }  
  };

  return (
    <>
        <div>
        {!['EX_TR', 'EX_CXL', 'REJ_NEW'].includes(value) && (
            <span >
            <DeleteOutlineIcon onClick={(e) => handleManualTradeCancel()} />
            </span>
        )}
        {['EX_CONF', 'EX_MOD'].includes(value) && (
            <span >
            <DriveFileRenameOutlineIcon onClick={() => {setselectedRow(data); setisManualTradeOpen(true)}} />
            </span>
        )}
        </div>
    </>
  );
}

export default ManualTradeActionsCell;
