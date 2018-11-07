export class Switch {
    constructor(id){
        this.id = id;
        this.element = $('#' + this.id);

        this.clickCallback = () => {};

        this.element.click((e) => {
            const state = this.element.is(':checked');

            this.clickCallback(state);
        });
    }

    onToogle(callback){
        this.clickCallback = callback;
    }

    setState(state){
        this.element.prop('checked', state);
    }
}