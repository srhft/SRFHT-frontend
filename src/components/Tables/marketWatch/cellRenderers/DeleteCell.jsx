import React, { useCallback } from 'react'
import DeleteIcon from "@mui/icons-material/DeleteForever"
import styled from 'styled-components'
import { marketWatchDelete_api } from '../../../../API/api';
import { toast } from 'react-toastify';

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

function DeleteCell(e) {
    const handleDelete = useCallback(async () => {
        e.api.applyTransaction({ remove: [e.data] });
        try {
            const {data} = await marketWatchDelete_api({id: e.data.id, tokenid2: e.data.tokenid2});
            if(data.status === "success") toast.success(data.result)
        } catch (error) {
            toast.error("Failed to delete MarketWatch!!")
        }
    }, [e.api, e.data]);

    return (      
        <Container>
            <DeleteIcon onClick={handleDelete}/>
        </Container>
    )
}

export default DeleteCell