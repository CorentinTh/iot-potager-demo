import {DataManager} from "./classes/DataManager";

const dataManager = new DataManager();

if (module.hot) {
    module.hot.accept(function() {
        location.reload();
    })
}
