const SlackBot = require('slackbots');
const config = require('./config')
const jenkins = require('jenkins')({ baseUrl: `http://${config.user}:${config.password}@${config.url}:${config.port}`, crumbIssuer: true });
const channel = "test-bot"
// create a bot
let bot = new SlackBot({
    token: config.token,
    name: 'Mio'
});

bot.on('start', () => {
    bot.postMessageToChannel(channel, `Meow! I'm Mio look forward to help you., Senpai!`);
    jenkins.info(function(err, data) {
        if (err)
            bot.postMessageToChannel(channel, `Nanika henn, I'm thinking something wrong with jenkins. :scream:`)
      });
});

bot.on('message', (message) => {
    if (message.bot_id === "B7EJ901PB")
        return;

    let text = message.text

    var deploy_pattern = /mio deploy/g

    if (deploy_pattern.test(text)) {
        deploy()
    }
})

function deploy() {

    jenkins.job.build('workhour-deploy', function (err, data) {
        if (err)
            bot.postMessageToChannel(channel, `:scream: Sumimasen !!, ${err}`)
        else
            bot.postMessageToChannel(channel, `Hai!! Wakarimashita., Deploying Workhour project`);
    });
}