const { GoogleGenAI } = require("@google/genai");
const {z} = require("zod");
const {zodToJsonSchema} = require("zod-to-json-schema");
const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
});


const interviewReportSchema = z.object({
    matchScore: z.number().min(0).max(100).describe("A match score between 0 and 100 indicating how well the candidate matches the job requirements."),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be to asked in the interview."),
        intention: z.string().describe("The intention behind asking this technical question."),
        answer: z.string().describe("How to answer this question, what points to cover, and what approach to take etc."),
    })).describe("Technical question that can be asked in the interview along with their intentions and answers."),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question can be to asked in the interview."),
        intention: z.string().describe("The intention behind asking this  behavioral question."),
        answer: z.string().describe("How to answer this question, what points to cover, and what approach to take etc.") ,
    })).describe("Behavioral questions that can be asked in the interview along with their intentions and answers."),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill that is missing or needs improvement."),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of the skill gap, indicating how critical it is for the candidate to address it."),
    })).describe("A list of skill gaps with their severity (low, medium, high)."),
    preparationPlan: z.array(z.object({
        day : z.number().describe("The day number in the preparation plan, starting from 1."),
        focus : z.string().describe("The main focus or theme for that day, such as 'Data Structures', 'Behavioral Questions', etc."),
        tasks: z.array(z.string()).describe("A list of tasks or activities the candidate should undertake on this day to prepare for the interview."),
    })).describe("A preparation plan for the candidate to improve their chances in the interview, broken down by day with specific tasks to complete."),

}).describe("The interview report generated for the candidate based on the job description, resume, and self-description they provided.");



async function generateInterviewReport(jobDescription, resumeText, selfDescription) {
    const prompt = `Based on the following job description, resume, and self-description, generate an interview report that includes:
1. A match score between 0 and 100 indicating how well the candidate matches the job requirements.
2. A list of technical questions with their intentions and answers.
3. A list of behavioral questions with their intentions and answers.
4. A list of skill gaps with their severity (low, medium, high).
5. A preparation plan for the candidate to improve their chances in the interview.
Job Description: ${jobDescription}
Resume Text: ${resumeText}
Self Description: ${selfDescription}`;
    

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: zodToJsonSchema(interviewReportSchema, "InterviewReport"),
            },
        });
        return response.text;
    }
    catch (error) {
        console.error("Error generating interview report:", error);
        throw error;
    }
}

module.exports = {
    generateInterviewReport,
};