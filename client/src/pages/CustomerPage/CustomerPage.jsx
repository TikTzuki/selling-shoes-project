import { Button, ButtonGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link as RouteLink } from 'react-router-dom'
import AskModel from '../../components/AskModal/AskModal'
import { axiosJsonServer } from '../../ultils/api'

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [openAskModal, setOpenAskModal] = useState(false);
  const [answer, setAnswer] = useState(false);

  const fetchCustomers = ()=>{
    axiosJsonServer.get('/customer')
    .then(res=>{
      setCustomers(res.data);
    })
  }

  const handleDelete = (e,id)=>{

        axiosJsonServer.delete(`/customer/${id}`)
        .then(res=>{
          fetchCustomers()
        })

  }

  useEffect(() => {
    fetchCustomers();
  }, [])

  return (
    <TableContainer>
      <Table>
        <TableHead>
         <TableRow>
           <TableCell>
             Tên
           </TableCell>
           <TableCell>
             Số điện thoại
           </TableCell>
           <TableCell>
             Địa chỉ
           </TableCell>
           <TableCell>
             Email
           </TableCell>
           <TableCell>
             ...
           </TableCell>
        </TableRow> 
        </TableHead>
        <TableBody>
          {customers.map((customer)=>(
            <TableRow>
              <TableCell>
                {customer.name}
              </TableCell>
              <TableCell>
                {customer.phone_number}
              </TableCell>
              <TableCell>
                {customer.address}
              </TableCell>
              <TableCell>
                {customer.email}
              </TableCell>
              <TableCell>
                <ButtonGroup>
                  <Button component={RouteLink} to={`/customer/modify/${customer.id}`}>
                    Sửa
                  </Button>
                  <Button onClick={(e)=>handleDelete(e,customer.id)}>
                    Xóa
                  </Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AskModel open={openAskModal} onClose={setOpenAskModal} setAnswer={setAnswer} />
    </TableContainer>
  )
}

export default CustomerPage
