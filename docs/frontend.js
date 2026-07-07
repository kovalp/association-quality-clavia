import {FrontWatch} from "./front_watch.js";
import {FrontSwitch} from "./front_switch.js";
import {FrontQuiz} from "./front_quiz.js";


class Frontend {
    constructor() {
        this.watch = new FrontWatch();
        this.switch = new FrontSwitch();
        this.quiz = new FrontQuiz();
    }

    update_watch(classifier, ann_id, upd_id, supply) {
        this.watch.update(classifier, ann_id, upd_id, supply);
        this.switch.update();
    }

}


export {Frontend};
