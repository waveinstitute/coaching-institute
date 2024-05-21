/** @format */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import Dashboard from './component/Dashboard.jsx';
import CourseOverview from './component/CourseOverview.jsx';
import CourseList from './component/CourseList.jsx';
import Footer from './component/Footer.jsx';
import { Contact } from './home/MiniComponent.jsx';
import ContactUs from './component/ContactUs.jsx';
import AboutUs from './component/AboutUs.jsx';

import { useLocation } from 'react-router-dom';

const ScrollToTop = ({ children }) => {
	const location = useLocation();

	React.useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);

	return <>{children}</>;
};

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Router>
			<ScrollToTop>
				<Routes>
					<>
						<Route
							path='/'
							element={<App />}
						/>
						<Route
							path='/dashboard/:to'
							element={<Dashboard />}
						/>
						<Route
							path='/course/:id'
							element={
								<>
									<CourseOverview />
									<Footer />
								</>
							}
						/>
						<Route
							path='/course'
							element={
								<>
									<CourseList />
									<Contact />
									<Footer />
								</>
							}
						/>
						<Route
							path='/contact'
							element={
								<>
									<ContactUs />
								</>
							}
						/>
						<Route
							path='/about'
							element={
								<>
									<AboutUs />
								</>
							}
						/>
					</>
				</Routes>
			</ScrollToTop>
		</Router>
	</React.StrictMode>
);
