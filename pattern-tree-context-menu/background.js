
const menuA = [
  { id: 'ItemF', act: (info, tab) => { console.log('Clicked ItemF', info, tab, info.menuItemId); alert('Clicked ItemF') } },
  { id: 'ItemG', act: (info, tab) => { console.log('Clicked ItemG', info, tab, info.menuItemId); alert('Clicked ItemG') } },
  { id: 'ItemH', act: (info, tab) => { console.log('Clicked ItemH', info, tab, info.menuItemId); alert('Clicked ItemH') } },
  { id: 'ItemI', act: (info, tab) => { console.log('Clicked ItemI', info, tab, info.menuItemId); alert('Clicked ItemI') } },
];

const menuB = [
  { id: 'ItemJ', act: (info, tab) => { console.log('Clicked ItemJ', info, tab, info.menuItemId); alert('Clicked ItemJ') } },
  { id: 'ItemK', act: (info, tab) => { console.log('Clicked ItemK', info, tab, info.menuItemId); alert('Clicked ItemK') } },
  { id: 'ItemL', act: (info, tab) => { console.log('Clicked ItemL', info, tab, info.menuItemId); alert('Clicked ItemL') } },
  { id: 'ItemM', act: (info, tab) => { console.log('Clicked ItemM', info, tab, info.menuItemId); alert('Clicked ItemM') } },
];


const rootMenu = [
  //
  // In real practice you must read chrome.contextMenus.ACTION_MENU_TOP_LEVEL_LIMIT
  //
  { id: 'ItemA', act: (info, tab) => { console.log('Clicked ItemA', info, tab, info.menuItemId); alert('Clicked ItemA') }, menu: menuA },
  { id: 'ItemB', act: (info, tab) => { console.log('Clicked ItemB', info, tab, info.menuItemId); alert('Clicked ItemB') }, menu: menuB },
  { id: 'ItemC', act: (info, tab) => { console.log('Clicked ItemC', info, tab, info.menuItemId); alert('Clicked ItemC') } },
  { id: 'ItemD', act: (info, tab) => { console.log('Clicked ItemD', info, tab, info.menuItemId); alert('Clicked ItemD') } },
  { id: 'ItemE', act: (info, tab) => { console.log('Clicked ItemE', info, tab, info.menuItemId); alert('Clicked ItemE') } },
];


const listeners = {};

const contexts = ['browser_action'];

const addMenu = (menu, root = null) => {

  for (let item of menu) {

    let id = item.id;
    let menu = item.menu;

    chrome.contextMenus.create({
      id: id,
      title: chrome.i18n.getMessage(id),
      contexts: contexts,
      parentId: root
    });

    listeners[id] = item;

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









