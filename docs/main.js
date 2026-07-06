import { Classifier, UPD_ID_LOOSE } from './classifier.js';
import { Frontend } from './frontend.js';

const ids = [0, 1, 0, 0, -1, UPD_ID_LOOSE];
const nextButton = document.getElementById('next-btn');

function get_random_id(len) {
    return ids[Math.floor(Math.random() * len)];
}

let classifier = new Classifier();
let front = new Frontend();

function handleNextClick() {
    const ann_id = get_random_id(5);
    const upd_id = get_random_id(6);
    const supply = get_random_id(2) === 1;
    front.update(classifier, ann_id, upd_id, supply);
}

nextButton.addEventListener('click', handleNextClick);
front.update(classifier, 1, 1, true);
