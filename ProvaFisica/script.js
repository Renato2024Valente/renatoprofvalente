const express = require('express');
const bodyParser = require('body-parser');
const { google } = require('googleapis');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/submit_results', async (req, res) => {
    const { email, score, grade, wrongAnswers } = req.body;

    // Configure the Google Classroom API
    const auth = new google.auth.GoogleAuth({
        keyFile: 'path/to/your/service-account-file.json',
        scopes: ['https://www.googleapis.com/auth/classroom.courses'],
    });

    const classroom = google.classroom({ version: 'v1', auth });

    try {
        // Example of how you might create an announcement or assignment with the results
        const response = await classroom.courses.announcements.create({
            courseId: 'your-course-id',
            requestBody: {
                text: `Resultado da prova:
                    Pontuação: ${score}/${questions.length}
                    Nota: ${grade}
                    Quantidade de erradas: ${wrongAnswers}`
            }
        });
        res.json({ success: true, data: response.data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
