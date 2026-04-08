const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const interviewController = require("../controllers/interview.controller");
const interviewRouter  = express.Router();
const upload = require("../middleware/file.middleware");


/**
 * @route POST /api/interview/
 * @desc Generate an interview report based on the job description, resume, and self-description provided by the candidate.
 * @access private
 * @body { jobDescription: string, resumeText: string, selfDescription: string }
 * @returns { matchScore: number, technicalQuestions: array, behavioralQuestions: array, skillGaps: array, preparationPlan: array }
 */

interviewRouter.post("/", authMiddleware.authUser, upload.single('resume'), interviewController.generateInterviewReportController);




module.exports = interviewRouter;