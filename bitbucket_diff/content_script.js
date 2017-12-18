const SUFFIXES_TO_FILTER = [
  'ai',
  'anim',
  'asset',
  'controller',
  'eps',
  'jpg',
  'meta',
  'png',
  'prefab',
  'unity',
];

const diffElements = document.querySelectorAll('section.iterable-item');
const commitFilesSummaries = document.querySelectorAll('ul.commit-files-summary li');
// TODO: Add checkbox for toggling whether to show filtered elements.
// const mainSection = document.querySelector('section.main');

const checkbox = document.createElement('input');
checkbox.setAttribute('type', 'checkbox');

const FILE_EXTENSION_REGEX = /^..*\.([^\.]*)$/;
function shouldHideFile(name) {
  if (!name) return false;

  const match = name.match(FILE_EXTENSION_REGEX);
  if (!match) return false;

  const extension = match[1];
  if (!extension) return false;

  if (SUFFIXES_TO_FILTER.includes(extension)) {
    return true;
  }
}

const DIFF_ELEMENT_FILE_NAME_REGEX = /^File (.+) [^ ]+$/;
for (const diffElement of diffElements) {
  const header = diffElement.querySelector('h1.filename');
  if (!header) continue;

  const match = header.innerText.match(DIFF_ELEMENT_FILE_NAME_REGEX);
  const fileName = match ? match[1] : header.innerText;
  if (shouldHideFile(fileName))  {
    diffElement.hidden = true;
  } else {
    const tryAgainElement = diffElement.querySelector('a.load-diff.try-again');

    if (tryAgainElement) {
      tryAgainElement.click();
    }
  }
}

for (const commitFilesSummary of commitFilesSummaries) {
  const fileNameElement = commitFilesSummary.querySelector('a.commit-files-summary--filename');
  if (!fileNameElement) continue;

  if (shouldHideFile(fileNameElement.innerText)) {
    commitFilesSummary.hidden = true;
  }
}

const tryAgainElements = document.querySelectorAll('a.load-diff.try-again');
for (const tryAgainElement of tryAgainElements) {
  if (tryAgainElement.hidden) {
    tryAgainElement.click();
  }
}