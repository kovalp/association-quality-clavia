import { Classifier, UPD_ID_LOOSE } from './classifier.js';
import { Frontend } from './frontend.js';

const ids = [0, 1, 0, 0, -1, UPD_ID_LOOSE];

function get_random_id(len) {
    return ids[Math.floor(Math.random() * len)];
}

let classifier = new Classifier();
let front = new Frontend();

function handle_next_watch() {
    const ann_id = get_random_id(5);
    const upd_id = get_random_id(6);
    const supply = get_random_id(2) === 1;
    front.update_watch(classifier, ann_id, upd_id, supply);
}

function handle_next_quiz() {
    let answer = "error";
    let ann_id = 0;
    let upd_id = 0;
    let supply = false;
    while (answer === "error") {
        ann_id = get_random_id(5);
        upd_id = get_random_id(6);
        supply = get_random_id(2) === 1;
        answer = classifier.classify(ann_id, upd_id, supply);
    }
    front.quiz.update(ann_id, upd_id, supply, answer);
}

front.watch.next_btn.addEventListener('click', handle_next_watch);
front.quiz.next_btn.addEventListener('click', handle_next_quiz);

front.update_watch(classifier, 1, 1, true);
