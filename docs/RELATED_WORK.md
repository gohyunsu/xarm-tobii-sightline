# Related Work Notes

This file is a compact, persistent complement to the interactive evidence map. Check source revisions before a paper submission.

## Closest gaze-conditioned VLA

- **Gaze2Act (Zuo et al., May 2026):** cross-view semantic grounding of first-person gaze to the robot view; perception-level contours/heatmaps; action-level conditioning; real Unitree G1 evaluation covering near-identical, unseen, transparent, compositional, subpart, part-conditioned, and dynamic-intent tasks. This is the nearest work and removes any “first gaze-conditioned VLA” claim.
  <https://zuo-kuangji.github.io/Gaze2Act/>
  <https://arxiv.org/abs/2605.30282>

- **Gaze-Regularized VLA (Pani and Yang, March 2026):** trains VLA attention to match gaze-like heatmaps without eye tracking at inference. Relevant to gaze supervision, not live referent input. Verify artifacts and review status.
  <https://arxiv.org/abs/2603.23202>

- **GazeVLA (Li et al., April 2026):** pretrains on egocentric human data and models gaze as an intention representation before action generation. Relevant to human-to-robot intention transfer, but distinct from live screen-gaze reference with a reject option.
  <https://arxiv.org/abs/2604.22615>
  <https://gazevla.github.io/>

## Gaze-guided robot interfaces

- **GAMMA / Intent at a Glance (Tay et al., January 2026):** egocentric gaze plus a VLM for intent inference and modular autonomous manipulation. Near neighbor for foundation-model-assisted skill selection.
  <https://arxiv.org/abs/2601.05336>

- **GazeGrasp (2025):** wearable eye gaze, object detection, and robotic grasping. Supports a classical gaze-to-object baseline and calibration/fixation analysis.
  <https://arxiv.org/abs/2501.07255>

- **Eye-Tracking-Driven Control in Daily Task Assistance (Fischer-Janzen et al., 2026):** assistive object/task selection, 3D gaze accuracy issues, and practical lessons.
  <https://arxiv.org/abs/2601.17404>

## VLA and adaptation

- **RT-1:** large-scale language-conditioned real-world robot learning.
  <https://arxiv.org/abs/2212.06817>

- **RT-2:** vision-language model co-fine-tuned to output robot actions as tokens; establishes the VLA formulation.
  <https://robotics-transformer2.github.io/>

- **OpenVLA:** open 7B VLA pretrained on 970k Open X-Embodiment episodes; official custom-data, LoRA, evaluation, and server paths. Primary candidate base model.
  <https://openvla.github.io/>
  <https://github.com/openvla/openvla>

- **OpenVLA-OFT:** optimized adaptation with continuous action prediction, action chunks, faster inference, and multi-image support. Preferred candidate when its action contract and compute fit xArm.
  <https://openvla-oft.github.io/>

- **Point-VLA (Yu et al., December 2025):** adds explicit bounding-box prompts to resolve text-only referential ambiguity in cluttered and unseen-object manipulation. It removes novelty from simply supplying a visual region to a VLA; GazePick must contribute how an uncertain human gaze signal produces or declines that region.
  <https://arxiv.org/abs/2512.18933>

- **VP-VLA (Wang et al., March 2026):** uses crosshairs and bounding boxes as a structured interface between high-level planning and low-level VLA execution, together with an auxiliary grounding objective. Relevant to the policy-interface extension, not evidence for live gaze inference.
  <https://arxiv.org/abs/2603.22003>
  <https://visualprompt-vla.github.io/>

- **Diffusion Policy:** strong narrow-domain imitation-learning baseline. Important because OpenVLA does not automatically outperform a focused policy on precise single-task manipulation.
  <https://diffusion-policy.cs.columbia.edu/>

- **Octo:** open generalist robot policy and alternative transferable-policy baseline.
  <https://octo-models.github.io/>

## Robot data

- **Open X-Embodiment:** 1M+ trajectories, 22 embodiments, 60 pooled datasets, and standardized action/data representation. Motivates RLDS and embodiment-aware normalization.
  <https://robotics-transformer-x.github.io/>

- **DROID:** large-scale in-the-wild real-robot manipulation data with consistent collection infrastructure and diverse views/scenes. Informs episode design and quality control.
  <https://droid-dataset.github.io/>

## Candidate grounding

- **OWL-ViT:** open-vocabulary text-conditioned object detection.
  <https://arxiv.org/abs/2205.06230>

- **Grounding DINO:** open-set language-grounded object detection.
  <https://arxiv.org/abs/2303.05499>

- **Segment Anything:** promptable segmentation for candidate masks/AOIs.
  <https://segment-anything.com/>

These methods generate candidates or masks. They do not by themselves establish which object the operator intends.

- **REI-Bench (Jiang et al., ICLR 2026):** benchmarks vague referring expressions in robot task planning and shows that underspecified reference can sharply degrade planning. It supports the ambiguity motivation but studies a different task level and remedy.
  <https://openreview.net/forum?id=vmBIF25KLf>

## Calibration and abstention

- **On Calibration of Modern Neural Networks (Guo et al., 2017):** reliability diagrams, expected calibration error, and temperature scaling.
  <https://proceedings.mlr.press/v70/guo17a.html>

- **Selective Classification for Deep Neural Networks (Geifman and El-Yaniv, 2017):** reject-option evaluation and risk–coverage trade-offs.
  <https://arxiv.org/abs/1705.08500>

## Platform

- **xarm_ros2:** official UFACTORY ROS 2 packages for xArm, MoveIt, simulation, grippers, and camera examples.
  <https://github.com/xArm-Developer/xarm_ros2>

## Candidate research gap

The most defensible gap is not gaze-conditioned or visually prompted VLA itself. It is:

1. screen-based Tobii gaze mapped into the exact robot-camera render with calibrated uncertainty;
2. selective referent inference with top-two ambiguity, abstention, and confirmation;
3. an explicit language-only, nearest-gaze, and click comparison with the guarded action skill held fixed;
4. risk–coverage, calibration, interaction-time, and boundary analysis rather than only successful rollouts;
5. a separate frozen-versus-xArm-adapted VLA comparison with the accepted referent held fixed.

This remains a candidate gap until the complete Gaze2Act paper/code and other contemporaneous 2026 work are audited at submission time.
