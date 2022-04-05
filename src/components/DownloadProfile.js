import React,{useEffect, useState} from 'react'
import {Box,Typography} from '@mui/material'
import logo from '../logo.png'
import Passport from '../Passport.png'
import { makeStyles } from '@material-ui/core'
import TableDetail from './TableDetail'
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


const useStyles = makeStyles({
    title:{
fontWeight:700,
color:'#000000',
fontSize:12
    },
    detail:{
    fontSize:12,
    fontWeight:500,
    
    }
})

const data ={
    name:'Chukwuma James Nnamdi',
    reg: 'FCE/PGDE/2021/002',
    level:'100 Level',
    session: '2022/2023 Session'

}
const headings = [
    'SN','Course Code','Course Title','Unit','Grade','Total point'
]
export default function DownloadProfile() {
const [detail, setDetail] = useState([])
const [id] = useState(0)
    useEffect(() => {
		fetch(`https://testapiomniswift.herokuapp.com/api/viewResult/${id}`)
			.then((res) => res.json())
			.then((result) => {
				setDetail(result.data.students);
			});
	}, []);

    const classes = useStyles();
  return (
    <Box sx={{minHeight:'100vh', display:'flex', width:'100vw', 
    flexDirection:'column',justifyContent:'flex-start',pt:4,backgroundColor:'#ffffff',padding:4}}>
        
       <Box sx={{display:'flex',justifyContent:'space-around',flexDirection:{xs:'column', sm:'column', md:'row',alignItems:'center'}}}> 
       <Box> <img src={logo} alt='logo' /> </Box>
       <Box sx={{display:'flex',flexDirection:'column',alignItems:'center', justifyContent:'center'}}> 
            <Typography sx={{fontWeight:700,fontSize:16}} > FREMONT COLLEGE OF EDUCATION</Typography>
            <Typography sx={{fontWeight:400,fontSize:12}} > No.5 Raymond Osuman Street, PMB 2191 Maitama, Abuja, Nigeria.</Typography>
            <Typography sx={{fontWeight:600, fontSize:20}}> Post Graduate Diploma in Education</Typography>
            <Typography sx={{fontWeight:700,fontSize:12}}>Student First Semester Statement Of Result </Typography>
       </Box>
       <Box> <img src={Passport} alt='passport' />  </Box>
       </Box>

       <Box sx={{display:'flex', justifyContent:'space-between',mt:6}}>
           <Box sx={{display:'flex', flexDirection:'row'}}> 
           <Typography className={classes.title}> Name:</Typography>
           <Typography className={classes.detail}> {data.name}</Typography>
           </Box>
           <Box sx={{display:'flex', flexDirection:'row'}}> 
           <Typography className={classes.title}> Reg No.:</Typography>
           <Typography className={classes.detail}> {data.reg}</Typography>
           </Box>

       </Box>
       <Box sx={{display:'flex', justifyContent:'space-between'}}>
           <Box sx={{display:'flex', flexDirection:'row'}}> 
           <Typography className={classes.title}> Level:</Typography>
           <Typography className={classes.detail}> {data.level}</Typography>
           </Box>
           <Box sx={{display:'flex', flexDirection:'row'}}> 
           <Typography className={classes.title}> Session:</Typography>
           <Typography className={classes.detail}> {data.session}</Typography>
           </Box>

       </Box>
      <Box>
      <Box sx={{mt:4}}>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 , overflow:'scroll'}} >
        <TableHead>
          <TableRow>

            {headings.map((heading) =>
                <StyledTableCell>{heading}</StyledTableCell> )}
            
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {data.map((row) => (
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
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
   </Box>
          
      </Box>

    </Box>
  )
}
