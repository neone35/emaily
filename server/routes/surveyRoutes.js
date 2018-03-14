const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require("mongoose");
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.post('/api/surveys',
        requireLogin,
        requireCredits,
        async (req, res) => {
            // req - incoming req, res - outgoing res
            const { title, subject, body, recipients } = req.body;
            const survey = new Survey({
                title: title,
                subject,
                body,
                recipients: recipients.split(',').map(email => ({ email: email.trim() })),
                _user: req.user.id,
                dateSent: Date.now()
            });
            // Send email
            const mailer = new Mailer(survey, surveyTemplate(survey));
            try {
                await mailer.send();
                await survey.save();
                req.user.credits -= 1;
                const user = await req.user.save();
                res.send(user); //with new value of credits
            } catch (err) {
                res.status(422);
            }
        });

    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thank you for voting');
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice'); // :extract-var , template

        _.chain(req.body) // functions one after another with same variable
            .map(({ email, url }) => {
                const pathname = new URL(url).pathname; // pathname = only /api/surveys/5971/yes
                const match = p.test(pathname); // if doesn't align with pathname, returns null
                if (match) {
                    return { email, surveyId: match.surveyId, choice: match.choice };
                }
            })
            .compact() // remove undefined 
            .uniqBy('email', 'surveyId') // remove elements with duplicate email AND surveyId | !email OR surveyId
            .each(({ surveyId, email, choice }) => {
                Survey.updateOne({
                    _id: surveyId,
                    recipients: {
                        $elemMatch: { email: email, responded: false }
                    }
                }, {
                        $inc: { [choice]: 1 },
                        $set: { 'recipients.$.responded': true },
                        lastResponded: new Date()
                    }).exec();
            })
            .value();

        // console.log(events);
        // const events = _.map(req.body, ({ email, url }) => {
        //     const pathname = new URL(url).pathname; // pathname = only /api/surveys/5971/yes
        //     const match = p.test(pathname); // if doesn't align with pathname, returns null
        //     if (match) {
        //         return { email, surveyId: match.surveyId, choice: match.choice};
        //     }
        // });
        // const compactEvents = _.compact(events); // remove undefined 
        // const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId'); // remove elements with duplicate email AND surveyId | !email OR surveyId

        res.send({}); //sendgrid, everything is OK
    });

    app.get('/api/surveys', requireLogin, async (req, res) => {
        // const surveys = await Survey.find({ _user: req.user.id }); // getting surveys with a lot of recipients
        const surveys = await Survey.find({ _user: req.user.id })
            .select({ 
                recipients: false
             });
        res.send(surveys);
    });
};