exports.seed = function (knex) {
  return knex('user').insert([{
      firstName: 'Christian',
      lastName: 'Tønsberg',
      email: 'christian@mail.com',
      password: '$2a$10$0nDY02kk9UeFPbOmzzHVtufG/vYVDpmjQtev777Dz/yo7ZgH1V2mW'
    },
    {
      firstName: 'Mathilde',
      lastName: 'Runge',
      email: 'mathilde@mail.com',
      password: '$2a$10$0nDY02kk9UeFPbOmzzHVtufG/vYVDpmjQtev777Dz/yo7ZgH1V2mW'
    },
    {
      firstName: 'Cecilie',
      lastName: 'Vilsfort',
      email: 'cecilie@mail.com',
      password: '$2a$10$0nDY02kk9UeFPbOmzzHVtufG/vYVDpmjQtev777Dz/yo7ZgH1V2mW'
    },
    {
      firstName: 'Anders',
      lastName: 'Latif',
      email: 'anders@mail.com',
      password: '$2a$10$0nDY02kk9UeFPbOmzzHVtufG/vYVDpmjQtev777Dz/yo7ZgH1V2mW'
    }
  ]);
};