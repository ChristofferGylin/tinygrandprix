export const drawMenu = (menu, yOffset = 0) => {

    const gameWidth = menu.game.config.width;
    const gameHeight = menu.game.config.height;

    const spacing = 50;

    let yPoint = ((gameHeight - yOffset) / 2) - (((menu.menuContent.menuItems.length - 1) * 50) / 2) + yOffset;

    menu.menuContent.menuItems.forEach(menuItem => {

        const title = menu.add.text(gameWidth / 2, yPoint, menuItem.displayTitle, menu.textStyle).setOrigin(0.5, 0.5).setShadow(2, 2, 'black', 0, true);
        menuItem.titleObject = title;
        yPoint += spacing;

    });

    menu.selectorHelmet = menu.add.image(menu.menuContent.menuItems[menu.menuSelection].titleObject.x - ((menu.menuContent.menuItems[menu.menuSelection].titleObject.width / 2) + 30), menu.menuContent.menuItems[menu.menuSelection].titleObject.y + 5, 'ui-icons', 'racing-helmet.png').setOrigin(0.5, 0.5);

}