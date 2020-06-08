import Candidate from './../models/candidateModel';
import catchAsync from './../utils/catchAsync';
import filterObj from './../utils/filterObj';

const getAllCandidates = catchAsync(async (req, res, next) => {
  const queryObject = {};
  const likeQueryFields = ['name', 'email', 'cellphoneNumber', 'jobTitle', 'team'];
  Object.keys(req.query).forEach(fieldName => {
    if (likeQueryFields.includes(fieldName)) {
      queryObject[fieldName] = { $regex: '.*' + req.query[fieldName] + '.*' }
    }
  });
  let query = Candidate.find(queryObject);
  const candidates = await query;

  res.status(200).json({
    status: 'success',
    count: candidates.length,
    data: {
      candidates
    }
  });
});

const createCandidate = catchAsync(async (req, res, next) => {
  const newCandidate = await Candidate.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      candidate: newCandidate,
    }
  });
});

const getCandidateById = catchAsync(async (req, res, next) => {
  const candidate = await Candidate.findById(req.params.id);

  res.status(201).json({
    status: 'success',
    data: {
      candidate
    }
  });
});

const updateCandidateById = catchAsync(async (req, res, next) => {
  const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      candidate,
    }
  });
});

const deleteCandidateById = catchAsync(async (req, res, next) => {
  await Candidate.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null
  });
});

export default {
  getAllCandidates,
  createCandidate,
  getCandidateById,
  updateCandidateById,
  deleteCandidateById,
}