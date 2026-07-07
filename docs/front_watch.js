import { OutcomeColors } from "./outcome_colors.js";

class FrontWatch {
    constructor() {
        this.ann_span = document.getElementById('ann');
        this.upd_span = document.getElementById('upd');
        this.supply_span = document.getElementById('supply');
        this.outcome_span = document.getElementById('outcome');
        this.cm_tp = document.getElementById('cm-tp');
        this.cm_fp = document.getElementById('cm-fp');
        this.cm_fn = document.getElementById('cm-fn');
        this.cm_tn = document.getElementById('cm-tn');
        this.ratios_accuracy = document.getElementById('ratios-accuracy');
        this.ratios_recall = document.getElementById('ratios-recall');
        this.ratios_precision = document.getElementById('ratios-precision');
        this.ratios_f1 = document.getElementById('ratios-f1');
        this.next_btn = document.getElementById('next-btn');
    }

    update(classifier, ann_id, upd_id, supply) {
        this.ann_span.textContent = ann_id.toString();
        this.upd_span.textContent = upd_id.toString();
        this.supply_span.textContent = supply ? "yes" : "no";
        const outcome = classifier.classify(ann_id, upd_id, supply);
        this.outcome_span.textContent = outcome.toString();
        this.outcome_span.style.color = OutcomeColors[outcome];
        this.cm_tp.textContent = classifier.num_tp.toString()
        this.cm_fp.textContent = classifier.num_fp.toString()
        this.cm_fn.textContent = classifier.num_fn.toString()
        this.cm_tn.textContent = classifier.num_tn.toString();
        this.ratios_accuracy.textContent = classifier.get_accuracy().toFixed(6);
        this.ratios_recall.textContent = classifier.get_recall().toFixed(4);
        this.ratios_precision.textContent = classifier.get_precision().toFixed(4);
        this.ratios_f1.textContent = classifier.get_f1().toFixed(4);
    }
}

export {FrontWatch};
