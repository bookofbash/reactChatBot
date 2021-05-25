const {WebhookClient} = require('dialogflow-fulfillment');
const mongoose = require('mongoose')
const Demand = mongoose.model('demand')
const Courses = mongoose.model('courses')
const Registration = mongoose.model('registration')


module.exports = app => {
    app.post('/', async (req, res) => {
        const agent = new WebhookClient({ request: req, response: res });   
        function waldo(agent) {
            agent.add(`Welcome to my Waldo fulfillment!`);
        }
        async function registration(agent) {
            const registration = new Registration({
                name: agent.parameters.name,
                address: agent.parameters.address,
                phone: agent.parameters.phone,
                email: agent.parameters.email,
                dateSent: Date.now()
            });
            try{
                let reg = await registration.save();
                console.log(reg)
            } catch (err) {
                console.log(err)
            }
        }
        async function learn(agent){
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
        }
          
            let course =  await Courses.findOne({'course': agent.parameters.programming});
            if (course !== null){
                responseText = `You want to learn about ${agent.parameters.programming}.
                Here is a link to a course I recommend: ${course.link}`;
            }
            agent.add(responseText);
         
        

        function fallback(agent) {
            agent.add(`I didn't understand`);
            agent.add(`I'm sorry, can you try again?`);
        }
        let intentMap = new Map();
        intentMap.set('Waldo', waldo);
        intentMap.set('programming', learn)
        intentMap.set('recommend course - yes', registration)
        intentMap.set('Default Fallback Intent', fallback);

        agent.handleRequest(intentMap);
    
    });
    
}