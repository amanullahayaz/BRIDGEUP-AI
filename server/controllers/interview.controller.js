const pdfParse = require("pdf-parse");
const generateInterviewReport = require("../services/ai.service");
const InterviewReportModel = require("../models/interviewReport.model");
async function generateInterviewReportController(jobDescription, resume, selfDescription) {
    try {
        const resumeText = await ( new pdfParse.PDFParse(resume.buffer));
        const report = await generateInterviewReport(jobDescription, resumeText.text, selfDescription);
        const interviewReport = new InterviewReportModel({
            user: req.user.id, // Assuming the authenticated user's ID is available in req.user
            resume: resumeText.text,
            selfDescription,
            jobDescription,
            ...report
        });
        res.status(200).json({
            message: "Interview report generated successfully",
            report: interviewReport,
        });



    }
    catch (error) {
        console.error("Error in generateInterviewReportController:", error);
        throw error;
    }
}

module.exports = {
    generateInterviewReportController,  
};