import {FrontWatch} from "./front_watch.js";
import {FrontSwitch} from "./front_switch.js";
import {FrontQuiz} from "./front_quiz.js";


class Frontend {
    constructor() {
        this.watch = new FrontWatch();
        this.switch = new FrontSwitch();
        this.quiz = new FrontQuiz();
    }

    update_watch(accumulator, ci) {
        this.watch.update(accumulator, ci);
        this.switch.update();
    }

}


export {Frontend};
