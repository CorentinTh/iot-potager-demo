export class Box {
    constructor(id, label, suffix = '') {
        this.id = id;
        this.label = label;
        this.suffix = suffix;
        this.init();
    }

    init() {
        this.element = $(`#${this.id} p`);

        this.element.last().text(this.label);
    }

    setValue(value) {
        this.element.first().text(value + this.suffix);
    }
}