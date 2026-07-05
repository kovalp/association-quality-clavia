const ids = [0, 1, 0, 0, -1, -9999];
const nextButton = document.getElementById('next-btn');
const UPD_ID_LOOSE = -9999;

function get_random_id(len) {
    return ids[Math.floor(Math.random() * len)];
}

const BinClass = {
    TP: 'TP',
    FP: 'FP',
    FN: 'FN',
    TN: 'TN'
};

const OutcomeColors = {
    TP: "#00f",
    FP: "#f0a",
    FN: "#f0f",
    TN: '#0af',
    error: "#666"
};

class Classifier {
    constructor() {
        this.num_tp = 0;
        this.num_fn = 0;
        this.num_fp = 0;
        this.num_tn = 0;
    }

    /**
     * Classify and accumulate the results of an association.
     *
     * @param {number} ann_id - The annotation ID from the instrumented target.
     * @param {number} upd_id - The update ID from the instrumented target.
     * @param {boolean} is_supplied - Indicates if the detection was supplied to tracker.
     * @returns {string} The BinClass enumerable value.
     */
    classify(ann_id, upd_id, is_supplied) {
        if (ann_id >= 0 && is_supplied) {
            if (ann_id === upd_id) {
                this.num_tp += 1;
                return BinClass.TP;
            } else if (upd_id >= 0) {
                this.num_fn += 1;
                return BinClass.FN;
            } else if (upd_id === -1) {
                this.num_fn += 1;
                return BinClass.FN;
            } else if (upd_id === UPD_ID_LOOSE) {
                this.num_fn += 1;
                return BinClass.FN;
            } else {
                return "error";
            }
        } else if (ann_id >= 0 && !is_supplied) {
            if (ann_id === upd_id) {
                return "error";
            } else if (upd_id >= 0) {
                this.num_fp += 1;
                return BinClass.FP;
            } else if (upd_id === -1) {
                this.num_fp += 1;
                return BinClass.FP;
            } else if (upd_id === UPD_ID_LOOSE) {
                this.num_tn += 1;
                return BinClass.TN;
            } else {
                return "error";
            }
        } else if (ann_id === -1) {
            if (ann_id === upd_id) {
                this.num_tn += 1;
                return BinClass.TN;
            } else if (upd_id >= 0) {
                this.num_fp += 1;
                return BinClass.FP;
            } else if (upd_id === UPD_ID_LOOSE) {
                this.num_tn += 1;
                return BinClass.TN;
            } else {
                return "error";
            }
        } else {
            return "error";
        }
    }

    get_accuracy() {
        return (this.num_tp + this.num_tn) / (this.num_fp + this.num_fn + this.num_tp + this.num_tn);
    }

    get_recall() {
        return this.num_tp / (this.num_tp + this.num_fn);
    }

    get_precision() {
        return this.num_tp / (this.num_tp + this.num_fp);
    }

    get_f1() {
        return Math.sqrt(this.get_recall() * this.get_precision());
    }
}

class Frontend {
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
