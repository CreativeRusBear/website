import GetJsonData from './GetJsonData.js';

export default class Meetup {
	constructor () {
		this.eventPath = new GetJsonData('./dist/json/dates.json');
		this.speakersPath = new GetJsonData('./dist/json/speakers.json');
		this.settings();
	}

	/**
	 *
	 * @returns {Promise<void>}
	 */

	async settings () {
		this.eventsArr = await this.eventPath.loadData();
		this.speakersArr = await this.speakersPath.loadData();
		this.futureEvents =this.findFutureEvents(this.eventsArr);
		this.nearestEvent = this.findNearestEvent(this.eventsArr);
		this.setEventsPoster(this.nearestEvent, this.futureEvents);
	}


	/**
	 *
	 * @param meetups
	 * @returns {[]}
	 */

	findFutureEvents ({meetups}) {
		const futureEvents = [];
		meetups.forEach(item => new Date(item.date) >= new Date() && futureEvents.push(item));
		return futureEvents;
	}

	/**
	 *
	 * @param meetups
	 * @returns {*}
	 */

	findNearestEvent ({meetups}) {
		return meetups.find(item => new Date(item.date) >= new Date()) || 'Данные уточняются';
	}

	/**
	 *
	 * @param nearestEvent
	 * @param futureEvents
	 */

	setEventsPoster (nearestEvent, futureEvents) {
		if (nearestEvent instanceof Object) {
			const dateOptions = {
				year   : 'numeric',
				month  : 'numeric',
				day    : 'numeric',
				hour   : 'numeric',
				minute : 'numeric',
				hour12 : false,
			};
			const date = new Date(nearestEvent.date).toLocaleDateString('ru-RU', dateOptions);
			document.querySelector('.nearest_event .event_name').textContent = nearestEvent.name;
			document.querySelector('.nearest_event .event_date').textContent = `Дата проведения: ${date}`;
			document.querySelector('.nearest_event .place').textContent =`Место проведения ${nearestEvent.place}`;
		} else {
			document.querySelector('.nearest_event .event_name').textContent = nearestEvent;
		}

	}
}