import bunyan from 'bunyan';
import BunyanSlack from 'bunyan-slack';

const log = bunyan.createLogger({
    name: 'TractionB2B',
    stream: new BunyanSlack({
        webhook_url: 'https://hooks.slack.com/services/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',
        channel: '#db_notify',
        username: '@david.hamel',
        icon_emoji: ':man_in_business_suit_levitating:',
        customFormatter(record, levelName) {
            return {
                attachments: [{
                    fallback: 'Database Update',
                    color: '#36a64f',
                    fields: [{
                        title: levelName + ' log',
                        value: ':beer:' + record.msg,
                        short: true
                    }]
                }]
            };
        }
    }),
    level: 'info'
});

export default log;
