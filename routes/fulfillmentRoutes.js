const {WebhookClient} = require('dialogflow-fulfillment');
const mongoose = require('mongoose')
const Demand = mongoose.model('demand')
const Courses = mongoose.model('courses')


module.exports = app => {
    console.log("fulfillment routes connected")
    app.post('/', async (req, res) => {
        const agent = new WebhookClient({ request: req, response: res });   
        function waldo(agent) {
            agent.add(`Welcome to my Waldo fulfillment!`);
        }
        async function learn(agent){
            console.log(agent.parameters.programming)
            Demand.findOne({'course': agent.parameters.programming}, function (err, programming) {

                if (programming !== null){
                    console.log("in the if statement")
                    programming.counter++; //Fix Counter logic
                    programming.save();
                }else {
                    const demand = new Demand({'course': agent.parameters.programming})
                    demand.save()
                }
                
            });
            
            let responseText = `You want to learn about ${agent.parameters.programming}.
            Here is a link to all of my courses: https://bookofbash.github.io/home`;
            try {
                let course =  await Courses.findOne({'course': agent.parameters.programming});
                if (course !== null){
                    responseText = `You want to learn about ${agent.parameters.programming}.
                Here is a link to a course I recommend: ${course.link}`;
                }
                agent.add(responseText)
            } catch(err){
                alert(err)
            }
            
        }
     

        function fallback(agent) {
            agent.add(`I didn't understand`);
            agent.add(`I'm sorry, can you try again?`);
        }
        let intentMap = new Map();
        intentMap.set('Waldo', waldo);
        intentMap.set('programming', learn)
        intentMap.set('Default Fallback Intent', fallback);

        agent.handleRequest(intentMap);
    
    });
    
}