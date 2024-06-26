export const formatTimeElepsed = (seconds: number) => {
    let minutes = Math.floor(seconds / 60);
    seconds -= (minutes * 60);

    let secString = `${seconds < 10 ? '0' + seconds : seconds}`;
    let mimString = `${minutes < 10 ? '0' + minutes : minutes}`;

    return `${mimString}: ${secString}`;
}