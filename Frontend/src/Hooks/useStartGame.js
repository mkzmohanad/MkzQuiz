import { useStartingGame } from "../Features/Quiz/useStartingGame";

export function useStartGame() {
    const {startingGame} = useStartingGame();

    return () => startingGame({"startGame" : true})
}