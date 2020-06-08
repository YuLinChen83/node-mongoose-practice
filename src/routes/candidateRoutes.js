import express from 'express';
import candidateController from './../controllers/candidateController';

const router = express.Router();

router
  .route('/')
  .get(candidateController.getAllCandidates)
  .post(candidateController.createCandidate);

router
  .route('/:id')
  .get(candidateController.getCandidateById)
  .patch(candidateController.updateCandidateById)
  .delete(candidateController.deleteCandidateById);

export default router;
