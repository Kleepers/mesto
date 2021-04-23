export default class Section {
    constructor({renderer},containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    clear() {
        this._container.innerHTML = '';
    }
    renderItems(items) {
        this.clear();
        items.forEach(item => {
            this._renderer(item);
        })
    }
    addItem(item) {
        this._container.append(item);
    }
    addNewItem(item) {
        this._container.prepend(item);
    }

}