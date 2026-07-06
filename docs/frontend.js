import {FrontendWatch} from "./front_watch.js";

const NUM_TRAIN_RUNS_MAX = 1;

class Frontend {
    constructor() {
        this.watch = new FrontendWatch();
        this.num_updates = 0
        this.quiz_container = document.getElementById('container-quiz');
        this.watch_container = document.getElementById('container-watch');
        this.watch_btn = document.getElementById('watch-btn');
        this.watch_btn.addEventListener('click', this.show_watch.bind(this));
        this.quiz_btn = document.getElementById('quiz-btn');
        this.quiz_btn.addEventListener('click', this.show_quiz.bind(this));
    }

    show_quiz() {
        this.quiz_container.classList.remove('hidden');
        this.watch_container.classList.add('hidden');
    }

    show_watch() {
        this.quiz_container.classList.add('hidden');
        this.watch_container.classList.remove('hidden');
    }

    update(classifier, ann_id, upd_id, supply) {
        this.watch.update(classifier, ann_id, upd_id, supply);
        this.num_updates++;
        if (this.num_updates > NUM_TRAIN_RUNS_MAX) {
            this.quiz_btn.classList.remove("hidden");
        }
    }
}


export {Frontend};
