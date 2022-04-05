import { Box } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#0D7590',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));



export default function TableDetail({heading,data}) {
  return (
   <Box>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 , overflow:'scroll'}} >
        <TableHead>
          <TableRow>

            {heading.map((heading) =>
                <StyledTableCell>{heading}</StyledTableCell> )}
            
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="right">{row.result.coursecode}</StyledTableCell>
              <StyledTableCell align="right">{row.result.title}</StyledTableCell>
              <StyledTableCell align="right">{row.result.credit_unit}</StyledTableCell>
              <StyledTableCell align="right">{row.result.grade}</StyledTableCell>
              <StyledTableCell align="right">{row.result.total_point}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   </Box>
  )
}
