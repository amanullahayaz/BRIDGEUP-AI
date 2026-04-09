const pdfParseModule = require("pdf-parse");
const PDFParse = pdfParseModule?.PDFParse ?? pdfParseModule?.default ?? pdfParseModule;
const { generateInterviewReport } = require("../services/ai.service");
const InterviewReportModel = require("../models/interviewReport.model");






/**
 * @description Controller to get interview report by interviewId. Only the user who created the report can access it.
 * @route GET /api/interview/report/:interviewId
 * @access private
 */
async function getInterviewReportByIdController(req, res) {
    try {
        const { interviewId } = req.params;
        const report = await InterviewReportModel.findById(interviewId);

        if (!report) {
            return res.status(404).json({ message: "Interview report not found" });
        }
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized: user information missing" });
        }
        if (report.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized access to this interview report" });
        }

        res.status(200).json({
            message: "Interview report retrieved successfully",
            report,
        });
    } catch (error) {
        console.error("Error in getInterviewReportByIdController:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

/**
 * 
 * @description Controller to generate interview report based on user self description, resume and job description. The generated report is saved in the database and returned in the response.
 * @route POST /api/interview/
 * @access private
 * 
 */

async function generateInterviewReportController(req, res) {
    try {
        const { jobDescription, selfDescription } = req.body;
        const resume = req.file;

        let resumeText = { text: "" };
        if (resume) {
            try {
                const parsed = await (typeof PDFParse === "function" && PDFParse.prototype && typeof PDFParse.prototype.getText === "function"
                    ? new PDFParse(resume.buffer).getText()
                    : PDFParse(resume.buffer));

                resumeText = typeof parsed === "string" ? { text: parsed } : parsed;
                if (!resumeText || typeof resumeText.text !== "string") {
                    resumeText = { text: "" };
                }
            } catch (error) {
                console.error("Error parsing PDF:", error);
                resumeText = { text: "Error parsing resume" };
            }
        }

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized: user information missing" });
        }

        const report = await generateInterviewReport(jobDescription, resumeText.text, selfDescription);
        const interviewReport = new InterviewReportModel({
            user: req.user.id,
            resume: resumeText.text,
            selfDescription,
            jobDescription,
            ...report
        });
        await interviewReport.save();
        res.status(200).json({
            message: "Interview report generated successfully",
            report: interviewReport,
        });
    } catch (error) {
        console.error("Error in generateInterviewReportController:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


async function getAllInterviewReportsController(req, res) {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized: user information missing" });
        }

        const reports = await InterviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("matchScore title createdAt updatedAt user"); // Include only necessary fields for listing

        res.status(200).json({
            message: "Interview reports retrieved successfully",
            reports,
        });
    } catch (error) {
        console.error("Error in getAllInterviewReportsController:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    generateInterviewReportController,  
    getInterviewReportByIdController,
    getAllInterviewReportsController
};