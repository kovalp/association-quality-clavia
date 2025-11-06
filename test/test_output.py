"""."""

from association_quality_clavia import AssociationQuality


def test_get_confusion_matrix(aq: AssociationQuality) -> None:
    """."""
    aq.num_tp = 10
    aq.num_fp = 9
    aq.num_fn = 8
    aq.num_tn = 7
    cm = aq.get_confusion_matrix()
    assert len(cm) == 4
    assert cm['tp'] == 10
    assert cm['fp'] == 9
    assert cm['fn'] == 8
    assert cm['tn'] == 7
