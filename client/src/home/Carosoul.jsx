/** @format */

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const Carosoul = ({ children, dots = true, loop = true, items = 1 }) => {
	return (
		<OwlCarousel
			className='owl-theme'
			margin={10}
			loop={loop}
			autoplay
			items={items}
			dots={dots}
		>
			{children}
		</OwlCarousel>
	);
};

export default Carosoul;
