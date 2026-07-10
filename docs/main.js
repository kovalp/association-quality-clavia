import { Frontend } from './frontend.js';
import { Accumulator, ClavIAInput, UPD_ID_LOOSE } from "./table.js";

const ids = [0, 1, 0, 0, -1, UPD_ID_LOOSE];

function get_random_id(len) {
    return ids[Math.floor(Math.random() * len)];
}

let accumulator = new Accumulator();
let front = new Frontend();


function get_next_case() {
    let ci = new ClavIAInput();
    while (ci.bin_class === "error") {
        ci.classify(get_random_id(5), get_random_id(6), get_random_id(2) === 1);
    }
    return ci;
}

function handle_next_watch() {
    const ci = get_next_case();
    accumulator.accumulate(ci.bin_class)
    front.update_watch(accumulator, ci);
}


function handle_next_quiz() {
    const ci = get_next_case();
    front.quiz.update(ci);
}

front.watch.next_btn.addEventListener('click', handle_next_watch);
front.quiz.next_btn.addEventListener('click', handle_next_quiz);

const first_io = new ClavIAInput(0, 0, true);
front.update_watch(accumulator, first_io);
