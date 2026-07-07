import { OutcomeColors } from "./outcome_colors.js";

class FrontQuiz {
    constructor() {
        this.ann = document.getElementById('ann-quiz');
        this.upd = document.getElementById('upd-quiz');
        this.supply = document.getElementById('supply-quiz');
        this.radio_tp = document.getElementById('TP');
        this.radio_fp = document.getElementById('FP');
        this.radio_fn = document.getElementById('FN');
        this.radio_tn = document.getElementById('TN');
        this.next_btn = document.getElementById('next-quiz');
        this.score = document.getElementById('quiz-score');
        this.answer = "TP";
        this.radio_tp.addEventListener("change", this.check_answer.bind(this));
        this.radio_fp.addEventListener("change", this.check_answer.bind(this));
        this.radio_fn.addEventListener("change", this.check_answer.bind(this));
        this.radio_tn.addEventListener("change", this.check_answer.bind(this));
        this.num_correct = 0;
        this.num_total = 0;
    }

    check_answer(event) {
         this.num_total++;
         if (event.target.id === this.answer){
             this.num_correct++;
             this.next_btn.classList.remove("wrong-color");
             this.next_btn.classList.remove("neutral-color");
             this.next_btn.classList.add("correct-color");
         } else {
             this.next_btn.classList.remove("correct-color");
             this.next_btn.classList.remove("neutral-color");
             this.next_btn.classList.add("wrong-color");
         }
         this.score.textContent = `${this.num_correct} / ${this.num_total}`;
    }

    update(ann_id, upd_id, supply, answer) {
        this.ann.textContent = ann_id.toString();
        this.upd.textContent = upd_id.toString();
        this.supply.textContent = supply ? "yes" : "no";
        this.answer = answer;
        this.radio_tp.checked = false;
        this.radio_fp.checked = false;
        this.radio_fn.checked = false;
        this.radio_tn.checked = false;
        this.next_btn.classList.remove("correct-color");
        this.next_btn.classList.remove("wrong-color");
        this.next_btn.classList.add("neutral-color");
    }
}

export {FrontQuiz};
