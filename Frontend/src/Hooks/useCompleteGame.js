import { useCompletingGame } from "../Features/Quiz/useCompletingGame";

export function useCompleteGame() {
    const {completeGame} = useCompletingGame();

    return () => completeGame({"startGame" : false})
}