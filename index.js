const simpleGit = require('simple-git');
const moment = require('moment');
const random = require('random');
const jsonfile = require('jsonfile');

const FILE_PATH = './data.json';
const NUM_DAYS = 365; // Số ngày bạn muốn tạo commit

const makeCommit = async () => {
  const git = simpleGit();
  for (let i = 0; i < NUM_DAYS; i++) {
    const date = moment().subtract(i, 'days').format('YYYY-MM-DD');
    const data = { date };
    jsonfile.writeFileSync(FILE_PATH, data);

    await git.add('./*');
    await git.commit(`Commit on ${date}`, {
      '--date': date,
    });

    console.log(`Committed for date: ${date}`);
  }
};

makeCommit().then(() => console.log('Done!'));
