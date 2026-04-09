const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const interviewController = require("../controllers/interview.controller");
const interviewRouter  = express.Router();
const upload = require("../middlewares/file.middleware");


/**
 * @route POST /api/interview/
 * @desc Generate an interview report based on the job description, resume, and self-description provided by the candidate.
 * @access private
 * @body { jobDescription: string, resumeText: string, selfDescription: string }
 */

interviewRouter.post("/", authMiddleware.authUser, upload.single('resume'), interviewController.generateInterviewReportController);

/**
 * @route GET /api/interview/report/:interviewId
 * @desc Get the interview report by interviewId.
 * @access private
 * @returns { matchScore: number, technicalQuestions: array, behavioralQuestions: array, skillGaps: array, preparationPlan: array }
 */

interviewRouter.get("/report/:interviewId", authMiddleware.authUser, interviewController.getInterviewReportByIdController);


/*
    * Additional routes for fetching all interview reports of the logged-in user and generating resume PDF can be added here.
    * For example:
    * GET /api/interview/ - Get all interview reports of the logged-in user.
    * access private
    
*/
interviewRouter.get("/", authMiddleware.authUser, interviewController.getAllInterviewReportsController);







module.exports = interviewRouter;