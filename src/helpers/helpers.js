export const formatTime = (t) => {
    let minutes = Math.floor(t / 60);
    let secondes = t % 60;
    if (minutes < 10) minutes = `0${minutes}`;
    if (secondes < 10) secondes = `0${secondes}`;
    return `${minutes}:${secondes}`;
};
