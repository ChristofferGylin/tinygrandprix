export const setMenuTimeOut = (scene) => {
    scene.inputControl.menuTimeout = true;
    setTimeout(() => {
        scene.inputControl.menuTimeout = false;
    }, 175);
}