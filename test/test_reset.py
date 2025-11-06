"""."""

from association_quality_clavia import AssociationQuality


def test_reset(aq: AssociationQuality) -> None:
    """."""
    aq.num_tp = 1
    aq.num_fp = 2
    aq.num_fn = 3
    aq.num_tn = 4
    aq.reset()
    assert repr(aq) == 'AssociationQuality(TP 0 TN 0 FP 0 FN 0)'
