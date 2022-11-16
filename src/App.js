import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Main from './components/nav/Main';
import { AuthProvider } from './context/auth';
import { TaskProvider } from './context/task';

import ForgotPassword from './pages/ForgotPassword';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Tasks from './pages/Tasks';

function App() {
	return (
		<AuthProvider>
			<TaskProvider>
				<BrowserRouter>
					<Main />
					<Toaster toastOptions={{ duration: 2000 }} />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/dashboard" element={<PrivateRoute />}>
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="tasks" element={<Tasks />} />
						</Route>

						<Route path="/register" element={<Register />} />
						<Route
							path="/forgot-password"
							element={<ForgotPassword />}
						/>

						<Route path="/login" element={<Login />} />
						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</BrowserRouter>
			</TaskProvider>
		</AuthProvider>
	);
}

export default App;
