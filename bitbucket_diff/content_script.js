const SUFFIXES_TO_FILTER = [
  'asset',
  'meta',
  'unity',
];

const diffElements = document.querySelectorAll('section.iterable-item');
// TODO: Add checkbox for toggling whether to show filtered elements.
// const mainSection = document.querySelector('section.main');

const checkbox = document.createElement('input');
checkbox.setAttribute('type', 'checkbox');

const FILE_NAME_REGEX = /^File ([^ ]*) /;
const FILE_EXTENSION_REGEX = /^..*\.([^\.]*)$/;

for (const diffElement of diffElements) {
  let match = diffElement.innerText.match(FILE_NAME_REGEX);
  if (!match) continue;

  const fileName = match[1];
  if (!fileName) continue;

  match = fileName.match(FILE_EXTENSION_REGEX);
  if (!match) continue;

  const extension = match[1];
  if (!extension) continue;

  if (SUFFIXES_TO_FILTER.includes(extension)) {
    diffElement.hidden = true;
  }
}