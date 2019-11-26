/**
 *
 */

export default class GetJsonData {
	constructor (url) {
		this.url = url;
	}


	/**
	 *
	 * @return {Promise<boolean|any>}
	 */

	async loadData () {
		const res = await fetch(this.url);
		return res.ok && await res.json();
	}
}