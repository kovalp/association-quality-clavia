# Classification via instrumented association in multiple-object trackers 


## Installation

Should be as easy as `pip install association-quality-clavia`, but if you downloaded the repo,
then `uv sync` standing in the root folder.


## Usage

The package provides a classifier machinery working on top of an instrumented 
multi-object tracker fed with identified detections (annotations).

The instrumentation consists of adding an annotation and update IDs to the target objects
(tracks) processed in the tracker. The annotation ID is initialized at the target creation time.
The update ID is updated after each association procedure.

The classifier script is capable of telling apart true positives, false positives,
false negatives and true negatives if provided with the annotation and update IDs
and the list of annotation IDs given to the tracker.

The use of the module will be demonstrated in the packages (repos) `pure-ab-3d-mot` and
`eval-ab-3d-mot`. The package `pure-ab-3d-mot` features a refactored AB3DMOT tracker
instrumented according to the needs of the binary classification of the association procedure.
The package `eval-ab-3d-mot` features a regular evaluation part extracted from the original
AB3DMOT as well as the example of use of the classifier from this package.

