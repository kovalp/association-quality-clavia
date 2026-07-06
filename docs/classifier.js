const UPD_ID_LOOSE = -9999;


const BinClass = {
    TP: 'TP',
    FP: 'FP',
    FN: 'FN',
    TN: 'TN'
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

export {Classifier, UPD_ID_LOOSE};

