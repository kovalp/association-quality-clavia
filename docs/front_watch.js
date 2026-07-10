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
        this.plain_english = document.getElementById('plain-english');
    }

    update(accumulator, ci) {
        this.ann_span.textContent = ci.format_id(ci.ann_id);
        this.upd_span.textContent = ci.format_id(ci.upd_id);
        this.supply_span.textContent = ci.format_supply();
        this.outcome_span.textContent = ci.bin_class.toString();
        this.outcome_span.style.color = OutcomeColors[ci.bin_class];
        this.cm_tp.textContent = accumulator.num_tp.toString()
        this.cm_fp.textContent = accumulator.num_fp.toString()
        this.cm_fn.textContent = accumulator.num_fn.toString()
        this.cm_tn.textContent = accumulator.num_tn.toString();
        this.ratios_accuracy.textContent = accumulator.get_accuracy().toFixed(6);
        this.ratios_recall.textContent = accumulator.get_recall().toFixed(4);
        this.ratios_precision.textContent = accumulator.get_precision().toFixed(4);
        this.ratios_f1.textContent = accumulator.get_f1().toFixed(4);
        this.plain_english.textContent = ci.get_plain_english();
    }
}

export {FrontWatch};
