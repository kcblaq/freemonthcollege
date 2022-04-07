import React,{useEffect, useState, useRef} from 'react'
import {Box,Typography} from '@mui/material'
import logo from '../logo.png'
import { makeStyles } from '@material-ui/core'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Paper, Button, Divider} from '@mui/material';
import {useLocation} from 'react-router-dom'
import {downloadAsPDF} from '../pdf'


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
    
    },
    blue:{
      color:'blue'
    },
    red:{
      color:'red'
    }
})

const headings = [
    'SN','Course Code','Course Title','Unit','Grade','Total point'
]

export default function DownloadProfile() {
const [detail, setDetail] = useState([])
const [cumulative, setCumulative] = useState([])
const [result, setResult] = useState('')
const [resultDetail, setResultDetail] = useState('')
console.log(resultDetail);

const location = useLocation()
const detailWrapper = useRef()

let id = location.pathname.split('/').pop()

    useEffect(() => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(),
        redirect: 'follow',
      };

		fetch(`https://testapiomniswift.herokuapp.com/api/viewResult/${id}`,requestOptions )
			.then((res) => res.json())
			.then((result) => {
        setResult(result)
        setResultDetail(result.data)
        setDetail(result.data.result);
        setCumulative(result.data.cummulative)

        
			});
    }, []);
    
    const headings2 = Object.keys(cumulative)
    const cumulativeBody = Object.values(cumulative)
    const remark = cumulativeBody.pop();
    const upper = headings2.map(element => {
      return element.toUpperCase();
    });
   

    const classes = useStyles();
  return (
    <>
    



    <Box sx={{minHeight:'100vh', display:'flex', width:'100vw', 
    flexDirection:'column',justifyContent:'flex-start',pt:4,backgroundColor:'#ffffff',px:'50px',py:'50px'}}
    ref={detailWrapper}
    >
    <Button variant='contained' sx={{position:'absolute', backgroundColor:'#0D7590'}} onClick={() => downloadAsPDF(detailWrapper.current, 'result')} > Download </Button>
        
       <Box sx={{display:'flex',justifyContent:'space-around',flexDirection:{xs:'column', sm:'column', md:'row',alignItems:'center'}}}> 
       <Box> <img src={result.logo} alt='logo' /> </Box>
       <Box sx={{display:'flex',flexDirection:'column',alignItems:'center', justifyContent:'center'}}> 
            <Typography sx={{fontWeight:700,fontSize:16, textAlign:'center'}} > FREMONT COLLEGE OF EDUCATION</Typography>
            <Typography sx={{fontWeight:400,fontSize:12, textAlign:'center'}} > No.5 Raymond Osuman Street, PMB 2191 Maitama, Abuja, Nigeria.</Typography>
            <Typography sx={{fontWeight:600, fontSize:20, textAlign:'center'}}> Post Graduate Diploma in Education</Typography>
            <Typography sx={{fontWeight:700,fontSize:12, textAlign:'center'}}>Student First Semester Statement Of Result </Typography>
       </Box>
       <Box> <img src={result.profile_picture} alt='User' />  </Box>
       </Box>

       <Box sx={{display:'flex', justifyContent:'space-between',mt:6}}>
           <Box sx={{display:'flex', flexDirection:'row'}}> 
           <Typography className={classes.title}> Name:</Typography>
           <Typography className={classes.detail}> {resultDetail.firstname + " " + resultDetail.surname}</Typography>
           </Box>
           <Box sx={{display:'flex', flexDirection:'row'}}> 
           <Typography className={classes.title}> Reg No.:</Typography>
           <Typography className={classes.detail}> {resultDetail.reg_no}</Typography>
           </Box>

       </Box>
       <Box sx={{display:'flex', justifyContent:'space-between'}}>
           <Box sx={{display:'flex', flexDirection:'row'}}> 
           <Typography className={classes.title}> Level:</Typography>
           <Typography className={classes.detail}> {resultDetail.level}</Typography>
           </Box>
           <Box sx={{display:'flex', flexDirection:'row'}}> 
           <Typography className={classes.title}> Session:</Typography>
           <Typography className={classes.detail}> {resultDetail.session}</Typography>
           </Box>

       </Box>
      <Box>
      <Box sx={{mt:4}}>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 , overflow:'scroll'}} >
        <TableHead>
          <TableRow>

            {headings.map((heading) =>
                <StyledTableCell align="left">{heading}</StyledTableCell> )}
            
          </TableRow>
        </TableHead>
        <TableBody>
          {detail && detail.map((row,index) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell align="left">{row?.coursecode}</StyledTableCell>
              <StyledTableCell align="left">{row?.title}</StyledTableCell>
              <StyledTableCell align="left">{row?.credit_unit}</StyledTableCell>
              <StyledTableCell align="left">{row?.grade}</StyledTableCell>
              <StyledTableCell align="left">{row?.total_point}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   </Box>
   <Box sx={{mt:4}}>
        <TableContainer component={Paper}>
      <Table sx={{ overflow:'scroll'}} >
        <TableHead>
          <TableRow>

            {upper.slice(0,6).map((heading) =>
                <StyledTableCell align="center">{heading}</StyledTableCell> )}
            
          </TableRow>
        </TableHead> 

        <TableBody>
        <TableRow>

{cumulativeBody.slice(0,6).map((item) =>
    <StyledTableCell align="center">{item}</StyledTableCell> )}

</TableRow>
          
        </TableBody>
      </Table>
    </TableContainer>
   </Box>
<Box sx={{display:'flex', mt:3}}>

   <Typography sx={{fontWeight:500, fontSize:12} } > Remarks: </Typography>
   <Typography sx={{fontWeight:500, fontSize:12} } className={remark === 'Pass'? classes.blue : classes.red} > {remark} </Typography>
   
   
</Box>
<Box>
  <Divider sx={{mt:10, maxWidth:'20%'}}/>
</Box>
<Typography> Registrar</Typography>
      </Box>

    </Box>
    
    </>
  )
}
