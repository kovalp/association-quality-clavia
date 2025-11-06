"""."""

from association_quality_clavia import AssociationQuality


def test_repr(aq: AssociationQuality) -> None:
    """."""
    aq.num_tp = 1
    aq.num_tn = 2
    aq.num_fp = 3
    aq.num_fn = 4
    assert repr(aq) == 'AssociationQuality(TP 1 TN 2 FP 3 FN 4)'
