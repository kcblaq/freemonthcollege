import './App.css';
import SearchForm from './components/SearchForm';
import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import DownloadProfile from './components/DownloadProfile';

function App() {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				backgroundColor: '#E5E5E5'
			}}>
			<Routes>
				<Route path="/" element={<SearchForm />} />
				<Route path="/download/:id" element={<DownloadProfile />} />
			</Routes>
		</Box>
	);
}

export default App;
