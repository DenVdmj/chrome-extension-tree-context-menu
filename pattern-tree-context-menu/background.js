
const menuA = [
  { id: 'ItemF', act: (info, tab) => { console.log('ItemF', info, tab, info.menuItemId); alert('ItemF') } },
  { id: 'ItemG', act: (info, tab) => { console.log('ItemG', info, tab, info.menuItemId); alert('ItemG') } },
  { id: 'ItemH', act: (info, tab) => { console.log('ItemH', info, tab, info.menuItemId); alert('ItemH') } },
  { id: 'ItemI', act: (info, tab) => { console.log('ItemI', info, tab, info.menuItemId); alert('ItemI') } },
];

const menuB = [
  { id: 'ItemJ', act: (info, tab) => { console.log('ItemJ', info, tab, info.menuItemId); alert('ItemJ') } },
  { id: 'ItemK', act: (info, tab) => { console.log('ItemK', info, tab, info.menuItemId); alert('ItemK') } },
  { id: 'ItemL', act: (info, tab) => { console.log('ItemL', info, tab, info.menuItemId); alert('ItemL') } },
  { id: 'ItemM', act: (info, tab) => { console.log('ItemM', info, tab, info.menuItemId); alert('ItemM') } },
];


const rootMenu = [
  //
  // In real practice you must read chrome.contextMenus.ACTION_MENU_TOP_LEVEL_LIMIT
  //
  { id: 'ItemA', menu: menuA },
  { id: 'ItemB', menu: menuB },
  { id: 'ItemC', act: (info, tab) => { console.log('ItemC', info, tab, info.menuItemId); alert('ItemC') } },
  { id: 'ItemD', act: (info, tab) => { console.log('ItemD', info, tab, info.menuItemId); alert('ItemD') } },
  { id: 'ItemE', act: (info, tab) => { console.log('ItemE', info, tab, info.menuItemId); alert('ItemE') } },
];


const listeners = {};

const contexts = ['browser_action'];

const addMenu = (menu, root = null) => {

  for (let item of menu) {

    let {id, menu, act} = item;

    chrome.contextMenus.create({
      id: id,
      title: chrome.i18n.getMessage(id),
      contexts: contexts,
      parentId: root
    });

    if (act) {
      listeners[id] = act;
    }

    if (menu) {
      addMenu(menu, id);
    }
  }

};

addMenu(rootMenu);

chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log('Activate „chrome.contextMenus -> onClicked Listener“', info, tab);
  listeners[info.menuItemId] (info, tab);
});

