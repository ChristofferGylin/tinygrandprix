import { setMenuTimeOut } from "./setMenuTimeOut.js";

export const setSelector = (menu, lastSelection) => {

    setMenuTimeOut(menu);
    menu.menuContent.menuItems[menu.menuSelection].titleObject.setStyle(menu.textStyleSelected);

    menu.selectorHelmet.x = menu.menuContent.menuItems[menu.menuSelection].titleObject.x - ((menu.menuContent.menuItems[menu.menuSelection].titleObject.width / 2) + menu.selectorHelmet.width);
    menu.selectorHelmet.y = menu.menuContent.menuItems[menu.menuSelection].titleObject.y;



    if (lastSelection !== undefined) menu.menuContent.menuItems[lastSelection].titleObject.setStyle(menu.textStyle);



}

