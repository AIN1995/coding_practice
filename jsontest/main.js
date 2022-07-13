class AreaSelector {
    constructor(rootElm) {
        this.rootElm = rootElm;
        this.Preflist = [];
        this.Citylist = [];
        this.PrefCode = null;
    }

    async init() {
        await this.updatePref();
        await this.updateCity();
    }

    async getPref() {
        const getpref = await fetch("./prefectures.json");
        return await getpref.json();
    }

    async getCity(code) {
        const getcity = await fetch(`./cities/${code}.json`);
        return await getcity.json();
    }

    async updatePref() {
        this.Preflist = await this.getPref();
        this.PrefCode = this.Preflist[0].code;
        this.CreatePref();
    }

    async updateCity() {
        this.Citylist = await this.getCity(this.PrefCode);
        this.CreateCity();
    }

    CreatePref() {
        const Preftag = this.rootElm.querySelector(".prefectures");
        Preftag.innerHTML = this.option(this.Preflist);
        
        Preftag.addEventListener("change",(event)=>{
            this.PrefCode = event.target.value;
            this.updateCity();
        });
    }

    CreateCity() {
        const Citytag = this.rootElm.querySelector(".cities");
        Citytag.innerHTML = this.option(this.Citylist);
    }

    option(records) {
        return records.map((record)=>{
            return `
            <option value="${record.code}" name="${record.name}">
            ${record.name}
            </option>
            `;
        }).join("");
    }
}

const areaSelector = new AreaSelector(document.getElementById("areaSelector"));
areaSelector.init();