export const updateHighScore = (highscore) => {
    localStorage.setItem("highscore", highscore);
};

export const getHighScore = () => {
    // eslint-disable-next-line no-debugger
    debugger;

    return localStorage.getItem("highscore");
};
