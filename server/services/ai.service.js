// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const {z} = require("zod");
// const {zodToJsonSchema} = require("zod-to-json-schema");
// const ai = new GoogleGenerativeAI({
//     apiKey: process.env.GOOGLE_GENAI_API_KEY,
// });


// const interviewReportSchema = z.object({
//     matchScore: z.number().min(0).max(100).describe("A match score between 0 and 100 indicating how well the candidate matches the job requirements."),
//     technicalQuestions: z.array(z.object({
//         question: z.string().describe("The technical question can be to asked in the interview."),
//         intention: z.string().describe("The intention behind asking this technical question."),
//         answer: z.string().describe("How to answer this question, what points to cover, and what approach to take etc."),
//     })).describe("Technical question that can be asked in the interview along with their intentions and answers."),
//     behavioralQuestions: z.array(z.object({
//         question: z.string().describe("The behavioral question can be to asked in the interview."),
//         intention: z.string().describe("The intention behind asking this  behavioral question."),
//         answer: z.string().describe("How to answer this question, what points to cover, and what approach to take etc.") ,
//     })).describe("Behavioral questions that can be asked in the interview along with their intentions and answers."),
//     skillGaps: z.array(z.object({
//         skill: z.string().describe("The skill that is missing or needs improvement."),
//         severity: z.enum(["low", "medium", "high"]).describe("The severity of the skill gap, indicating how critical it is for the candidate to address it."),
//     })).describe("A list of skill gaps with their severity (low, medium, high)."),
//     preparationPlan: z.array(z.object({
//         day : z.number().describe("The day number in the preparation plan, starting from 1."),
//         focus : z.string().describe("The main focus or theme for that day, such as 'Data Structures', 'Behavioral Questions', etc."),
//         tasks: z.array(z.string()).describe("A list of tasks or activities the candidate should undertake on this day to prepare for the interview."),
//     })).describe("A preparation plan for the candidate to improve their chances in the interview, broken down by day with specific tasks to complete."),
//     title: z.string().describe("A title of the job, for which the interview report is generated."),

// }).describe("The interview report generated for the candidate based on the job description, resume, and self-description they provided.");




async function generateInterviewReport(jobDescription, resumeText, selfDescription) {
    // Temporary mock response until @google/generative-ai is installed
    return {
        matchScore: 85,
        technicalQuestions: [
            {
                question: "Explain how you would optimize a slow SQL query.",
                intention: "To assess understanding of database performance and optimization techniques.",
                answer: "I would start by analyzing the query execution plan, check for missing indexes, and consider query rewriting or denormalization if needed."
            }
        ],
        behavioralQuestions: [
            {
                question: "Tell me about a time when you had to learn a new technology quickly.",
                intention: "To evaluate adaptability and learning skills.",
                answer: "I recently learned React in 2 weeks by building a personal project, using official documentation and online tutorials."
            }
        ],
        skillGaps: [
            {
                skill: "Advanced SQL optimization",
                severity: "medium"
            }
        ],
        preparationPlan: [
            {
                day: 1,
                focus: "Technical Skills Review",
                tasks: ["Review core programming concepts", "Practice coding problems"]
            }
        ],
        title: "Software Engineer Position"
    };
}

module.exports = {
    generateInterviewReport,
};