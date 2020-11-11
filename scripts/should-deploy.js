const util = require('util');
const exec = util.promisify(require('child_process').exec);
const semverMajor = require('semver/functions/major');

const [currentTag] = process.argv.slice(2);

(async () => {
  try {
    // Fetch all tags
    await exec('git fetch --depth=1 origin +refs/tags/*:refs/tags/*');
  } catch (err) {
    console.error('Could not fetch all tags');
    process.exit(5);
  }

  let previousTag;
  try {
    // Get sorted tags
    const { stdout } = await exec("git for-each-ref --sort=taggerdate --format '%(tag)' refs/tags");
    const tags = stdout.split('\n');

    // Get previous tag
    const previousIndex = tags.findIndex((e) => e.includes(currentTag)) - 1;
    previousTag = tags[previousIndex].replace(/'/g, '');
  } catch (err) {
    console.error('Could not get previous tag');
    process.exit(5);
  }

  if (!previousTag) {
    console.error('No previous tag found');
    process.exit(5);
  }

  // Will deploy if previous has major change, eg: sdk upgrade
  if (semverMajor(previousTag) > semverMajor(currentTag)) {
    process.stdout.write('true');
    process.exit(0);
  }

  let files = [];
  try {
    // Get name of files that changed between the two tags
    const { stdout } = await exec(`git diff --name-only ${previousTag} ${currentTag}`);
    files = stdout.split('\n');
  } catch (err) {
    console.error('Could not get changes');
    process.exit(5);
  }

  /**
   * For a list of the changes that require a re-deploy, see:
   * https://docs.expo.io/workflow/publishing/#some-native-configuration-cant-be-updated-by
   */
  if (
    files.some((file) => {
      return (
        file === 'app.json' ||
        file === 'app.config.js' ||
        file === 'app.config.ts' ||
        file.startsWith('assets/') ||
        file.endsWith('google-services.json') ||
        file.endsWith('GoogleService-Info.plist')
      );
    })
  ) {
    process.stdout.write('true');
  }
})();
