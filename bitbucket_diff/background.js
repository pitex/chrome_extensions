chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { 
              hostEquals: 'bitbucket.org',
              pathContains: 'pull-requests',
              pathSuffix: 'diff',
            },
          })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      },
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { 
              hostEquals: 'bitbucket.org',
              pathContains: '/commits/',
            },
          })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});