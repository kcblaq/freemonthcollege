import React, { useState, useEffect } from 'react';
import {
	Box,
	Card,
	MenuItem,
	InputLabel,
	Select,
	FormControl,
	Button,
	Typography,
	Table,
	TableCell,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from '@mui/material';



 export default function SearchForm() {
	const [age, setAge] = useState('');
	const [state, setState] = useState('');
	const [level, setLevel] = useState('');
	const [gender, setGender] = useState('');
	const [mydata, setData] = useState('');
	const [active, setActive] = useState(0)
	const [profileDetail, setProfileDetail] = useState([])

	useEffect(() =>{
		
	})

	const filter = {
		gender,
		age,
		level,
		state,
	};

	function GetDetail() {

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(filter),
			redirect: 'follow',
		};
		fetch(
			`https://testapiomniswift.herokuapp.com/api/viewResult/${active}`,
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => {
				setProfileDetail(result)
			})
			.catch((error) => console.log('error', error));
	}
	console.log('Active:',profileDetail)

	
	function PostFilter() {
		var requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(filter),
			redirect: 'follow',
		};
		fetch(
			'https://testapiomniswift.herokuapp.com/api/filterData',
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => {
				if (result?.data?.students.length > 0) {
					setData(result?.data?.students);
				} else {
					alert('No data found');
				}
			})
			.catch((error) => console.log('error', error));
	}
	
	useEffect(() => {
		fetch('https://testapiomniswift.herokuapp.com/api/viewAllData')
			.then((res) => res.json())
			.then((result) => {
				setData(result.data.students);
			});
	}, []);
	
	return (
		<Box sx={{ backgroundColor: '#E5E5E5', maxWidth: '100vw',height:'100vh', padding: 4 }}>
			<Typography
				sx={{
					color: '#343434',
					fontFamily: 'Lato',
					fontWeight: 900,
					fontSize: 40,
					mb: 2,
				}}>
				{' '}
				Student Data Table
			</Typography>
			<Card>
				<Typography
					sx={{
						color: '#616161',
						fontFamily: 'Lato',
						fontWeight: 400,
						px: 4,
						py: 2,
					}}>
					{' '}
					Filter Student Table By:
				</Typography>
				<Box
					sx={{
						width: '100vw',
						height: { md: '20vh', lg: '20vh', sm: '30vh', xs: '30vh' },
						backgroundColor: '#ffffff',
						mt: { sm: 0, xs: 0, md: 2, lg: 2 },
						padding: 4,
						display: 'flex',
						justifyContent: 'start',
						flexWrap: 'wrap',
					}}>
					<FormControl
						sx={{
							minWidth: { xs: '30%', sm: '30%', md: '30%' },
							mx: { xs: 0, sm: 0, md: 2, lg: 2 },
						}}>
						<InputLabel>Age</InputLabel>
						<Select
							value={age}
							label="Age"
							onChange={(e) => setAge(e.target.value)}>
							{mydata &&
								mydata.map((ages) => (
									<MenuItem key={ages.id} value={ages.age}>
										{ages.age}{' '}
									</MenuItem>
								))}
						</Select>
					</FormControl>
					<FormControl
						sx={{
							minWidth: { xs: '30%', sm: '30%', md: '30%' },
							mx: { xs: 0, sm: 0, md: 2, lg: 2 },
						}}>
						<InputLabel>State</InputLabel>
						<Select
							value={state}
							label="State"
							onChange={(e) => setState(e.target.value)}>
							{mydata &&
								mydata.map((states) => (
									<MenuItem key={states.id} value={states.state}>
										{states.state}{' '}
									</MenuItem>
								))}
						</Select>
					</FormControl>
					<FormControl
						sx={{
							minWidth: { xs: '30%', sm: '30%', md: '30%' },
							mx: { xs: 0, sm: 0, md: 2, lg: 2 },
						}}>
						<InputLabel>Level</InputLabel>
						<Select
							value={level}
							label="Level"
							onChange={(e) => setLevel(e.target.value)}>
							{mydata &&
								mydata.map((levels) => (
									<MenuItem key={levels.id} value={levels.level}>
										{levels.level}{' '}
									</MenuItem>
								))}
						</Select>
					</FormControl>

					<FormControl
						sx={{
							minWidth: { xs: '30%', sm: '30%', md: '30%' },
							mx: { xs: 0, sm: 0, md: 2, lg: 2 },
						}}>
						<InputLabel>Gender</InputLabel>
						<Select
							value={gender}
							label="Gender"
							onChange={(e) => setGender(e.target.value)}>
							{mydata &&
								mydata.map((gender) => (
									<MenuItem key={gender.id} value={gender.gender}>
										{gender.gender}{' '}
									</MenuItem>
								))}
						</Select>
					</FormControl>
					<Button
						variant="contained"
						onClick={PostFilter}
						sx={{
							minWidth: {
								xs: '50%',
								backgroundColor: '#46C35F',
								textTransform: 'none',
								sm: '50%',
								md: '30%',
								height: 60,
							},
							mx: { xs: 1, sm: 1, md: 2, lg: 2 },
						}}>
						{' '}
						Search
					</Button>
				</Box>
			</Card>

			<Card sx={{ minHeight: '30vh', overflow: 'scroll', my: 4 }}>
				<TableContainer component={Paper}>
					<Table
						sx={{ overflow: 'scroll' }}
						size="small"
						aria-label="a dense table">
						<TableHead>
							<TableRow>
								<TableCell align="center">S/N</TableCell>
								<TableCell align="center">Surname</TableCell>
								<TableCell align="center">Firstname</TableCell>
								<TableCell align="center">age</TableCell>
								<TableCell align="center">Gender</TableCell>
								<TableCell align="center">Level</TableCell>
								<TableCell align="center">State</TableCell>
								<TableCell align="center">Action</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{mydata &&
								mydata.map((data) => (
									<TableRow>
										<TableCell
											component="th"
											scope="row"
											align="center"
											key={data.id}>
											{data.id}
										</TableCell>
										<TableCell align="center">{data.surname}</TableCell>
										<TableCell align="center">{data.firstname}</TableCell>
										<TableCell align="center">{data.age}</TableCell>
										<TableCell align="center">{data.gender}</TableCell>
										<TableCell align="center">{data.level}</TableCell>
										<TableCell align="center">{data.state}</TableCell>
										<TableCell align="center">
											{' '}
											<Button
												variant="contained"
												sx={{ backgroundColor: 'green' }}
												onClick={() =>{
													setActive(data.id)
													GetDetail()
													}}>
												Download
											</Button>
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer>
			</Card>
		</Box>
	);
}

// export  {Downloaddetail }