import async from 'async';
import crypto from 'crypto';

const templateSignUpId = process.env.SENDGRID_TEMPLATE_SIGNUP_ID;
const templateForgetId = process.env.SENDGRID_TEMPLATE_FORGET_ID;
const templateResetId = process.env.SENDGRID_TEMPLATE_RESET_ID;
const templateContact = process.env.SENDGRID_TEMPLATE_CONTACT_ID;
const templateInviteTeam = process.env.SENDGRID_TEMPLATE_TEAM_ID;
const templateInvitePartner = process.env.SENDGRID_TEMPLATE_PARTNER_ID;
const templateMatchContact = process.env.SENDGRID_TEMPLATE_MATCH_CONTACT;
const templateProjectMatchContact = process.env.SENDGRID_TEMPLATE_PROJECT_CONTACT;
const tempelateAutoEmail = process.env.SENDGRID_TEMPLATE_AUTO_EMAIL;
const welcomeEmailSend = process.env.welcomeEmailSend || 'sidharth.chugh@digitalpartners.io';
const SupportEmailSend = process.env.SupportEmailSend || 'sidharth.chugh@digitalpartners.io';
const ContactEmailSend = process.env.ContactEmailSend || 'sidharth.chugh@digitalpartners.io';
const InviteTeamEmailSend = process.env.InviteTeamEmailSend || 'sidharth.chugh@digitalpartners.io';
const InvitePartnerEmailSend = process.env.InvitePartnerEmailSend || 'sidharth.chugh@digitalpartners.io';
const MatchContactEmailSend = process.env.MatchContactEmailSend || 'sidharth.chugh@digitalpartners.io';
const MatchProjectContactEmailSend = process.env.MatchProjectContactEmailSend || 'sidharth.chugh@digitalpartners.io';
const AutoEmailSend = process.env.AutoEmailSend || 'notifications@digitalpartners.io';
const emailName = process.env.emailName || 'Welcome at DigitalPartners.io';
const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

// Welcome Email
export function sendWelcomeEmail(user, host, finalCB) {
  async.waterfall([
      (done) => {
        crypto.randomBytes(15, (err, buf) => {
          const token = buf.toString('hex');
          done(err, token);
        });
      },
      (token, done) => {
        user.verifyEmailToken = token;
        // Expires Token in 24 Hrs
        user.verifyEmailTokenExpires = Date.now() + 3600000 * 48; //eslint-disable-line

        user.save((err) => {
          done(err, user);
        });
      },
      (done) => {
        const request = sg.emptyRequest();
        request.body = {
          from: {
            email: welcomeEmailSend,
            name: emailName
          },
          mail_settings: {
            sandbox_mode: {
              enable: false
            }
          },
          personalizations: [
            {
              substitutions: {
                firstName: user.firstName,
                action_url: host + '/validateEmail/' + user.verifyEmailToken,
              },
              to: [
                {
                  email: user.email
                }
              ]
            }
          ],
          template_id: templateSignUpId,
          tracking_settings: {
            click_tracking: {
              enable: true,
              enable_text: true
            },
            ganalytics: {
              enable: true
            },
            open_tracking: {
              enable: true,
              substitution_tag: '%opentrack'
            }
          }
        };
        request.method = 'POST';
        request.path = '/v3/mail/send';
        sg.API(request, function (error, response) { //eslint-disable-line
            console.log(response.statusCode, 'SignUp Email');
            console.log(response.body);
        }, done);
      }
    ],
    (err) => {
      if (err) {
        console.log('Could not send welcome email to: ' + user.email);
        console.error(err);
        if (finalCB) {
          finalCB({
            message: 'Could not send welcome email to: ' + user.email
          });
        }
      } else if (finalCB) {
          finalCB();
      }
    });
}

// export function sendPassiveEmail(user, host, finalCB) {
//   async.waterfall([
//       (done) => {
//         crypto.randomBytes(15, (err, buf) => {
//           const token = buf.toString('hex');
//           done(err, token);
//         });
//       },
//       (token, done) => {
//         user.verifyEmailToken = token;
//         // Expires Token in 24 Hrs
//         user.verifyEmailTokenExpires = Date.now() + 3600000 * 48; //eslint-disable-line

//         user.save((err) => {
//           done(err, user);
//         });
//       },
//       (done) => {
//         const request = sg.emptyRequest();
//         request.body = {
//           from: {
//             email: welcomeEmailSend,
//             name: emailName
//           },
//           mail_settings: {
//             sandbox_mode: {
//               enable: false
//             }
//           },
//           personalizations: [
//             {
//               substitutions: {
//                 firstName: user.firstName,
//                 action_url: host + '/validateEmail/' + user.verifyEmailToken,
//               },
//               to: [
//                 {
//                   email: user.email
//                 }
//               ]
//             }
//           ],
//           template_id: templateSignUpId,
//           tracking_settings: {
//             click_tracking: {
//               enable: true,
//               enable_text: true
//             },
//             ganalytics: {
//               enable: true
//             },
//             open_tracking: {
//               enable: true,
//               substitution_tag: '%opentrack'
//             }
//           }
//         };
//         request.method = 'POST';
//         request.path = '/v3/mail/send';
//         sg.API(request, function (error, response) { //eslint-disable-line
//             console.log(response.statusCode, 'SignUp Email');
//             console.log(response.body);
//         }, done);
//       }
//     ],
//     (err) => {
//       if (err) {
//         console.log('Could not send welcome email to: ' + user.email);
//         console.error(err);
//         if (finalCB) {
//           finalCB({
//             message: 'Could not send welcome email to: ' + user.email
//           });
//         }
//       } else if (finalCB) {
//           finalCB();
//       }
//     });
// }

// Forget Email
export function sendForgetEmail(user, host, finalCB) {
  async.waterfall([
      (done) => {
        crypto.randomBytes(15, (err, buf) => {
          const resetToken = buf.toString('hex');
          done(err, resetToken);
        });
      },
      (resetToken, done) => {
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save((err) => {
          done(err, user);
        });
      },
      (done) => {
        const request = sg.emptyRequest();
        request.body = {
          from: {
            email: SupportEmailSend,
            name: 'ForgetPassword for DigitalPartners.io'
          },
          mail_settings: {
            sandbox_mode: {
              enable: false
            }
          },
          personalizations: [
            {
              substitutions: {
                firstName: user.firstName,
                action_url: host + '/resetPassword/' + user.resetPasswordToken,
              },
              to: [
                {
                  email: user.email
                }
              ]
            }
          ],
          template_id: templateForgetId,
          tracking_settings: {
            click_tracking: {
              enable: true,
              enable_text: true
            },
            ganalytics: {
              enable: true
            },
            open_tracking: {
              enable: true,
              substitution_tag: '%opentrack'
            }
          }
        };
        request.method = 'POST';
        request.path = '/v3/mail/send';
        sg.API(request, function (error, response) { //eslint-disable-line
            console.log(response.statusCode, 'Forget Email');
            console.log(response.body);
        }, done);
      }
    ],
    (err) => {
      if (err) {
        console.log('Could not send forget password email to: ' + user.email);
        console.error(err);
        if (finalCB) {
          finalCB({
            message: 'Could not send forget password email to: ' + user.email
          });
        }
      } else if (finalCB) {
          finalCB();
      }
    });
}

// Password Changed Email
export function sendResetEmail(user, host, finalCB) {
  async.waterfall([
      (done) => {
        const request = sg.emptyRequest();
        request.body = {
          from: {
            email: SupportEmailSend,
            name: 'Password Changed for DigitalPartners.io'
          },
          mail_settings: {
            sandbox_mode: {
              enable: false
            }
          },
          personalizations: [
            {
              substitutions: {
                firstName: user.firstName
               },
              to: [
                {
                  email: user.email
                }
              ]
            }
          ],
          template_id: templateResetId,
          tracking_settings: {
            click_tracking: {
              enable: true,
              enable_text: true
            },
            ganalytics: {
              enable: true
            },
            open_tracking: {
              enable: true,
              substitution_tag: '%opentrack'
            }
          }
        };
        request.method = 'POST';
        request.path = '/v3/mail/send';
        sg.API(request, function (error, response) { //eslint-disable-line
          console.log(response.statusCode, 'Reset Email');
          console.log(response.body);
        }, done);
      }
    ],
    (err) => {
      if (err) {
        console.log('Could not send reset email to: ' + user.email);
        console.error(err);
        if (finalCB) {
          finalCB({
            message: 'Could not send reset email to: ' + user.email
          });
        }
      } else if (finalCB) {
          finalCB();
      }
    });
}

// Contact Email
export function sendContactEmail(user, host, finalCB) {
  async.waterfall([
      (done) => {
        const request = sg.emptyRequest();
        request.body = {
          from: {
            email: ContactEmailSend,
            name: 'Contact Info from' + user.name
          },
          mail_settings: {
            sandbox_mode: {
              enable: false
            }
          },
          personalizations: [
            {
              substitutions: {
                name: user.name,
                phoneNumber: user.phoneNumber,
                email: user.email,
                subject: user.subject,
                message: user.message
               },
              to: [
                {
                  email: 'info@digitalpartners.io'
                }
              ]
            }
          ],
          template_id: templateContact,
          tracking_settings: {
            click_tracking: {
              enable: true,
              enable_text: true
            },
            ganalytics: {
              enable: true
            },
            open_tracking: {
              enable: true,
              substitution_tag: '%opentrack'
            }
          }
        };
        request.method = 'POST';
        request.path = '/v3/mail/send';
        sg.API(request, function (error, response) { //eslint-disable-line
          console.log(response.statusCode, 'Contact Email');
          console.log(response.body);
        }, done);
      }
    ],
    (err) => {
      if (err) {
        console.log('Could not send contact form  email to: ' + user.email);
        console.error(err);
        if (finalCB) {
          finalCB({
            message: 'Could not send contact form email to: ' + user.email
          });
        }
      } else if (finalCB) {
          finalCB();
      }
    });
}


// Auto Email
export function sendAutoEmail(notificationName, firstName, lastName, elasticID, emailIds, subjectText, finalCB) {
  async.waterfall([
      (done) => {
        const request = sg.emptyRequest();
        request.body = {
          from: {
            email: AutoEmailSend,
            name: notificationName
          },
          mail_settings: {
            sandbox_mode: {
              enable: false
            }
          },
          personalizations: [
            {
              substitutions: {
                firstName,
                lastName,
                elasticID,
                notificationName,
                emailIds
               },
              to: [
                {
                  email: 'david.hamel@digitalpartners.io'
                }
              ],
               subject: subjectText
            }
          ],
          template_id: tempelateAutoEmail,
          tracking_settings: {
            click_tracking: {
              enable: true,
              enable_text: true
            },
            ganalytics: {
              enable: true
            },
            open_tracking: {
              enable: true,
              substitution_tag: '%opentrack'
            }
          }
        };
        request.method = 'POST';
        request.path = '/v3/mail/send';
        sg.API(request, function (error, response) { //eslint-disable-line
          console.log(response.statusCode, 'Notification Email');
          console.log(response.body);
        }, done);
      }
    ],
    (err) => {
      if (err) {
        console.log('Could not send notification email to: david.hamel@digitalpartners.io');
        console.error(err);
        if (finalCB) {
          finalCB({
            message: 'Could not send notification email to: david.hamel@digitalpartners.io'
          });
        }
      } else if (finalCB) {
          finalCB();
      }
    });
}

// Invite Team Email
export function sendInviteTeamEmail(user, companyInfo, host, finalCB) {
  console.log(companyInfo, 'companyinfo');
  console.log(user, 'user');
  async.waterfall([
      (done) => {
        crypto.randomBytes(15, (err, buf) => {
          const inviteTeamToken = buf.toString('hex');
          done(err, inviteTeamToken);
        });
      },
      (inviteTeamToken, done) => {
        user.inviteTeamMemberToken = inviteTeamToken;
        user.inviteTeamMemberTokenExpires = Date.now() + 3600000 * 48; // 48 hour

        user.save((err) => {
          done(err, user);
        });
      },
      (done) => {
        const request = sg.emptyRequest();
        request.body = {
          from: {
            email: InviteTeamEmailSend,
            name: 'Invite Team Member'
          },
          mail_settings: {
            sandbox_mode: {
              enable: false
            }
          },
          personalizations: [
            {
              substitutions: {
                inviteeCompanyName: companyInfo.inviteeCompanyName,
                inviteefirstName: companyInfo.inviteefirstName,
                teamMemberFirstName: companyInfo.teamMemberFirstName,
                teamMemberLastName: companyInfo.teamMemberLastName,
                teamMemberMessage: companyInfo.teamMemberMessage,
                action_url: host + '/validateTeamMember/' + user.inviteTeamMemberToken,
              },
              to: [
                {
                  email: companyInfo.teamMemberEmail
                }
              ],
              cc: [
               {
                  email: companyInfo.inviteeEmailID
               }
             ],
               subject: 'Join your Team on DigitalPartners.io'
            }
          ],
          template_id: templateInviteTeam,
          tracking_settings: {
            click_tracking: {
              enable: true,
              enable_text: true
            },
            ganalytics: {
              enable: true
            },
            open_tracking: {
              enable: true,
              substitution_tag: '%opentrack'
            }
          }
        };
        request.method = 'POST';
        request.path = '/v3/mail/send';
        sg.API(request, function (error, response) { //eslint-disable-line
          console.log(response.statusCode, 'Invite Team Member Email');
          console.log(response.body);
        }, done);
      }
    ],
    (err) => {
      if (err) {
        console.log('Could not send invite team member email to: ' + user.email);
        console.error(err);
        if (finalCB) {
          finalCB({
            message: 'Could not send invite team member email  to: ' + user.email
          });
        }
      } else if (finalCB) {
          finalCB();
      }
    });
}

// Invite Team Email
export function sendInvitePartnerEmail(user, companyInfo, host, finalCB) {
  async.waterfall([
      (done) => {
        crypto.randomBytes(15, (err, buf) => {
          const inviteTeamToken = buf.toString('hex');
          done(err, inviteTeamToken);
        });
      },
      (inviteTeamToken, done) => {
        user.invitePartnerToken = inviteTeamToken;
        user.invitePartnerTokenExpires = Date.now() + 3600000 * 48; // 48 hour

        user.save((err) => {
          done(err, user);
        });
      },
      (done) => {
        const request = sg.emptyRequest();
        request.body = {
          from: {
            email: InvitePartnerEmailSend,
            name: 'Invite Team Member'
          },
          mail_settings: {
            sandbox_mode: {
              enable: false
            }
          },
          personalizations: [
            {
              substitutions: {
                inviteeCompanyName: companyInfo.inviteeCompanyName,
                partnerCompanyName: companyInfo.partnerCompanyName,
                inviteefirstName: companyInfo.inviteefirstName,
                partnerFirstName: companyInfo.partnerFirstName,
                partnerLastName: companyInfo.partnerLastName,
                partnerMessage: companyInfo.partnerMessage,
                action_url: host + '/validatePartner/' + user.invitePartnerToken,
              },
              to: [
                {
                  email: companyInfo.partnerEmail
                }
              ],
              cc: [
               {
                  email: companyInfo.inviteeEmailID
               }
             ],
              subject: `Join ${companyInfo.inviteeCompanyName} on DigitalPartners.io`,
            }
          ],
          template_id: templateInvitePartner,
          tracking_settings: {
            click_tracking: {
              enable: true,
              enable_text: true
            },
            ganalytics: {
              enable: true
            },
            open_tracking: {
              enable: true,
              substitution_tag: '%opentrack'
            }
          }
        };
        request.method = 'POST';
        request.path = '/v3/mail/send';
        sg.API(request, function (error, response) { //eslint-disable-line
          console.log(response.statusCode, 'Invite Partner Email');
          console.log(response.body);
        }, done);
      }
    ],
    (err) => {
      if (err) {
        console.log('Could not send invite partner email to: ' + user.email);
        console.error(err);
        if (finalCB) {
          finalCB({
            message: 'Could not send invite partner to: ' + user.email
          });
        }
      } else if (finalCB) {
          finalCB();
      }
    });
}


export function sendMatchContact(matchValues, userInfo, companyInfo, host, finalCB) {
  async.waterfall([
      (done) => {
        const request = sg.emptyRequest();
        request.body = {
          from: {
            email: MatchContactEmailSend,
            name: 'Anfrage für Zusammenarbeit von DigitalPartners.io – Collaboration Request'
          },
          mail_settings: {
            sandbox_mode: {
              enable: false
            }
          },
          personalizations: [
            {
              substitutions: {
                // TODO: make a more sensible condition for rendering Match names
                matchFirstName: matchValues.senderCompanyStatus === 'Active' ? userInfo.matchFirstName : 'Passive',
                matchLastName: matchValues.senderCompanyStatus === 'Active' ? userInfo.matchLastName : 'Profiles',
                senderFirstName: matchValues.senderFirstName,
                senderLastName: matchValues.senderLastName,
                senderCompanyName: companyInfo.senderCompanyName,
                senderIndustry: companyInfo.senderIndustry || ' ',
                senderHeadquarters: companyInfo.senderHeadquarters || ' ',
                senderDescription: companyInfo.senderDescription || ' ',
                senderSubject: matchValues.senderMessage,
                matchCompanyName: matchValues.companyName.typeValues,
                senderBusinessType: matchValues.businessType.typeValues ? '' : matchValues.businessType.typeValues[0].value,
                matchProduct: matchValues.products[0] ? '' : matchValues.products[0].productName.typeValues,
                germanSearchType: (matchValues.searchType === 'productSearch' || matchValues.searchType === 'productDetailSearch' || matchValues.searchType === 'startupSearch') ? 'product interessiert' : 'einer Zusammenarbeit interessiert',
                englishSearchType: (matchValues.searchType === 'productSearch' || matchValues.searchType === 'productDetailSearch' || matchValues.searchType === 'startupSearch') ? 'is interested in a potential collaboration with ' + matchValues.companyName.typeValues + ' regarding product' : 'is interested in a potential collaboration with' + matchValues.companyName.typeValues
               },
               to: [
                 {
                   email: matchValues.senderCompanyStatus === 'Active' ? userInfo.matchEmail : 'matches@digitalpartners.io'
                 }
               ],
               cc: [
                {
                   email: matchValues.emailaddress
                }
              ],
                subject: ' Product Match'
            }
          ],
          template_id: templateMatchContact,
          tracking_settings: {
            click_tracking: {
              enable: true,
              enable_text: true
            },
            ganalytics: {
              enable: true
            },
            open_tracking: {
              enable: true,
              substitution_tag: '%opentrack'
            }
          }
        };
        request.method = 'POST';
        request.path = '/v3/mail/send';
        sg.API(request, function (error, response) { //eslint-disable-line
          console.log(response.statusCode, 'Match Email');
          console.log(response.body);
        }, done);
      }
    ],
    (err, matchValues) => {
      if (err) {
        console.log('Could not send Match Contact email to: ' + matchValues.senderEmail);
        console.error(err);
        if (finalCB) {
          finalCB({
            message: 'Could not send Match Contact email to: ' + matchValues.senderEmail
          });
        }
      } else if (finalCB) {
          finalCB();
      }
    });
}


export function sendMatchProjectContact(matchValues, userInfo, companyInfo, host, finalCB) {
  async.waterfall([
      (done) => {
        const request = sg.emptyRequest();
        request.body = {
          from: {
            email: MatchContactEmailSend,
            name: 'Project Application'
          },
          mail_settings: {
            sandbox_mode: {
              enable: false
            }
          },
          personalizations: [
            {
              substitutions: {
                matchFirstName: userInfo.matchFirstName || ' ',
                matchLastName: userInfo.matchLastName || ' ',
                senderFirstName: matchValues.senderFirstName || ' ',
                senderLastName: matchValues.senderLastName || ' ',
                senderCompanyName: companyInfo.senderCompanyName || ' ',
                senderIndustry: companyInfo.senderIndustry || ' ',
                senderHeadquarters: companyInfo.senderHeadquarters || ' ',
                senderDescription: companyInfo.senderDescription || ' ',
                senderSubject: matchValues.senderMessage || ' ',
                matchCompanyName: matchValues.companyName.typeValues || ' ',
            //    senderBusinessType: matchValues.businessType.typeValues[0].value || ' ',
               },
               to: [
                 {
                   email: userInfo.matchEmail
                 }
               ],
               cc: [
                {
                   email: matchValues.emailaddress
                }
              ],
                subject: 'Project Application'
             }
          ],
          template_id: templateMatchContact,
          tracking_settings: {
            click_tracking: {
              enable: true,
              enable_text: true
            },
            ganalytics: {
              enable: true
            },
            open_tracking: {
              enable: true,
              substitution_tag: '%opentrack'
            }
          }
        };
        request.method = 'POST';
        request.path = '/v3/mail/send';
        sg.API(request, function (error, response) { //eslint-disable-line
          console.log(response.statusCode, 'Match Email');
          console.log(response.body);
        }, done);
      }
    ],
    (err, matchValues) => {
      if (err) {
        console.log('Could not send Match Contact email to: ' + matchValues.senderEmail);
        console.error(err);
        if (finalCB) {
          finalCB({
            message: 'Could not send Match Contact email to: ' + matchValues.senderEmail
          });
        }
      } else if (finalCB) {
          finalCB();
      }
    });
}

export default {
  sendWelcomeEmail,
  sendForgetEmail,
  sendResetEmail,
  sendContactEmail,
  sendInviteTeamEmail,
  sendInvitePartnerEmail,
  sendMatchContact,
  sendMatchProjectContact,
  sendAutoEmail
};
