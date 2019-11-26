import PubSub from 'pubsub-js';


/**
 *
 */

export default class Pagination {
	constructor () {
		this.activeSlide = 0;
		this.max = document.querySelectorAll('section').length-1;
		this.canGo = true;
	}


	/**
	 *
	 */

	setClassForOddPaginationItems () {
		const items = document.querySelectorAll('.pagination a');
		items.forEach((item, index) => {
			if (index % 2) {
				item.classList.add('odd');
			}
		});
	}


	/**
	 *
	 */

	scrollEvents () {
		window.onwheel= e => {
			if (!this.canGo) return;
			this.canGo = false;
			const direction = e.deltaY > 0 ? 1: -1;
			const newSlide=this.activeSlide + direction;
			setTimeout(() => this.canGo=true, 1300);
			if (newSlide > this.max || newSlide < 0) return;
			PubSub.publish('goToSlide', {from: this.activeSlide, to: newSlide});
			this.activeSlide = newSlide;
		};
	}


	/**
	 *
	 */

	clickEvents () {
		const that = this;
		const links=document.querySelectorAll('.pagination a');
		for (const val of links) {
			val.onclick=function (e) {
				e.preventDefault();
				if (!that.canGo) return;
				const newSlide=parseInt(this.getAttribute('data-gotoslide'));
				if (newSlide!==that.activeSlide) {
					PubSub.publish('goToSlide', {from: that.activeSlide, to: newSlide});
					that.activeSlide=newSlide;
				}
			};
		}
	}
}
