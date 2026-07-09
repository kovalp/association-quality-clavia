
const UPD_ID_LOOSE = -9999;


const BinClass = {
    TP: 'TP',
    FP: 'FP',
    FN: 'FN',
    TN: 'TN'
};

/**
 * Classify association results.
 *
 * @param {number} ann_id - The annotation ID from the instrumented target.
 * @param {number} upd_id - The update ID from the instrumented target.
 * @param {boolean} is_supplied - Indicates if the detection was supplied to tracker.
 * @returns {number} case number.
 */

function get_case(ann_id, upd_id, is_supplied) {
    if (ann_id >= 0 && is_supplied) {
        if (ann_id === upd_id) {
            return 1;
        } else if (upd_id >= 0) {
            return 2;
        } else if (upd_id === -1) {
            return 3;
        } else if (upd_id === UPD_ID_LOOSE) {
            return 4;
        } else {
            return 13;
        }
    } else if (ann_id >= 0 && !is_supplied) {
        if (ann_id === upd_id) {
            return 5;
        } else if (upd_id >= 0) {
            return 6;
        } else if (upd_id === -1) {
            return 7;
        } else if (upd_id === UPD_ID_LOOSE) {
            return 8;
        } else {
            return 14;
        }
    } else if (ann_id === -1) {
        if (ann_id === upd_id) {
            return 9;
        } else if (upd_id >= 0) {
            return 10;
        } else if (ann_id === upd_id) {
            return 11;
        } else if (upd_id === UPD_ID_LOOSE) {
            return 12;
        } else {
            return 15;
        }
    } else {
        return 16;
    }
}

const BIN_CLASS = {
    1: BinClass.TP,
    2: BinClass.FN,
    3: BinClass.FN,
    4: BinClass.FN,
    5: "error",
    6: BinClass.FP,
    7: BinClass.FP,
    8: BinClass.TN,
    9: BinClass.TN,
    10: BinClass.FP,
    11: BinClass.TN,
    12: BinClass.TN,
    13: "error",
    14: "error",
    15: "error",
    16: "error",
    }

function get_bin_class(case_num){
    return BIN_CLASS[case_num];
}


class Accumulator {
    constructor() {
        this.num_tp = 0;
        this.num_fn = 0;
        this.num_fp = 0;
        this.num_tn = 0;
    }

    /**
     * Accumulate the results of an association.
     */
    accumulate(bin_class) {
        if (bin_class === BinClass.TP) {
            this.num_tp++;
        } else if (bin_class === BinClass.FN) {
            this.num_fn++;
        } else if (bin_class === BinClass.FP) {
            this.num_fp++;
        } else if (bin_class === BinClass.TN) {
            this.num_tn++;
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


class ClavIAInput{
    constructor(ann_id, upd_id, supply) {
        this.ann_id = ann_id;
        this.upd_id = upd_id;
        this.supply = supply;
        this.case_num = -1;
        this.bin_class = "error";
        this.classify(ann_id, upd_id, supply);
    }

    classify(ann_id, upd_id, is_supplied){
        this.ann_id = ann_id;
        this.upd_id = upd_id;
        this.supply = is_supplied;
        this.case_num = get_case(ann_id, upd_id, is_supplied);
        this.bin_class = get_bin_class(this.case_num);
    }

    format_id(id){
        if (id === -1){
            return 'clutter';
        }
        else if (id === UPD_ID_LOOSE){
            return 'unmatched';
        }
        else {
            return id.toString();
        }
    }

    format_supply(){
        return this.supply ? "yes" : "no";
    }

    get_plain_english(){
        if (this.case_num === 1){
            return `The target was created from a real object with ID ${this.ann_id}.
            The annotation ID ${this.ann_id} is present among detection IDs.
            The matching is done to the same ID. Thus, this is true positive (TP).`
        } else if (this.case_num === 2) {
            return `The target was created from a real object with ID ${this.ann_id}.
            The annotation ID ${this.ann_id} is present among detection IDs.
            However, the association is done to a different real object with ID ${this.upd_id}.
            Thus, this is false negative (FN).`
        }
        else {
            return this.case_num.toString();
        }

    }


}

export {get_case, get_bin_class, Accumulator, ClavIAInput, UPD_ID_LOOSE};

