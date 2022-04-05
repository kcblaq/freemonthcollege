import React from 'react'
import {Box,Typography} from '@mui/material'
import logo from '../logo.png'
import Passport from '../Passport.png'
import { makeStyles } from '@material-ui/core'


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

export default function DownloadProfile() {
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

    </Box>
  )
}
