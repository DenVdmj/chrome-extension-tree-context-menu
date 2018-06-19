const menus = {
  //
  // In real practice you must read chrome.contextMenus.ACTION_MENU_TOP_LEVEL_LIMIT
  //
  ItemA: (info, tab) => { console.log('Clicked ItemA', info, tab, info.menuItemId); alert('Clicked ItemA') },
  ItemB: (info, tab) => { console.log('Clicked ItemB', info, tab, info.menuItemId); alert('Clicked ItemB') },
  ItemC: (info, tab) => { console.log('Clicked ItemC', info, tab, info.menuItemId); alert('Clicked ItemC') },
  ItemD: (info, tab) => { console.log('Clicked ItemD', info, tab, info.menuItemId); alert('Clicked ItemD') },
  ItemE: (info, tab) => { console.log('Clicked ItemE', info, tab, info.menuItemId); alert('Clicked ItemE') },
  ItemF: (info, tab) => { console.log('Clicked ItemF', info, tab, info.menuItemId); alert('Clicked ItemF') },
};

const listeners = {};

for (let name of Object.keys(menus)) {
  chrome.contextMenus.create({
    id: name,
    title: chrome.i18n.getMessage(name),
    contexts: ['browser_action']
  });
  listeners[name] = menus[name];
};

chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log('Activate „chrome.contextMenus -> onClicked Listener“', info, tab)
  listeners[info.menuItemId] (info, tab);
});

chrome.browserAction.onClicked.addListener(tab => {
  console.log('Clicked Main Browser Action', tab);
  chrome.tabs.create({url: 'chrome://settings/'});
});



