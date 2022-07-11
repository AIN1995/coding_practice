class AreaSelector {
    constructor(rootElm) {
        this.rootElm = rootElm;
        this.prefectures = [];
        this.cities = [];
        this.prefCode = null;
    }

    async init() {
        await this.updatePref();
        await this.updateCity();
    }

    async getPrefs() {
        const prefResponse = await fetch("./prefectures.json");
        return await prefResponse.json();
    }

}