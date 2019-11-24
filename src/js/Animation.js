import PubSub from 'pubsub-js';
import {TimelineMax} from 'gsap';

PubSub.subscribe('goToSlide', (msg, data) => {
	const sections = document.querySelectorAll('section');
	const currentSlide = sections[data.from];
	const newSlide = sections[data.to];
	const elements=currentSlide.querySelectorAll('.data-stagger');
	const newElements=newSlide.querySelectorAll('.data-stagger');

	const tl=new TimelineMax();
	tl
		.staggerFromTo(elements, 0.3, {y: 0, opacity: 1}, {y: -20, opacity: 0}, 0.1)
		.to(currentSlide, 1, {y: '-100%', opacity: 0})
		.fromTo(newSlide, 1, {y: '100%'}, {y: '0%', opacity: 1}, 0.3)
		.staggerFromTo(newElements, 0.3, {y: 20, opacity: 0}, {y: 0, opacity: 1}, 0.1, '-=0.4');
});
