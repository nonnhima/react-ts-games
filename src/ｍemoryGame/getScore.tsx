import { ScoreType } from "./MemoryGame";

// タイムスコアを取得する
export const getTimeScore = (seconds: number, minutes: number) => {
    if (minutes === 0 && seconds < 50) {
        // 50秒未満
        return ScoreType.S
    }
    if (minutes === 0 && 50 <= seconds) {
        // 1分未満
        return ScoreType.A
    }
    if (minutes >= 1 && seconds < 30) {
        // 1分30秒未満
        return ScoreType.B
    }
    // それ以上
    return ScoreType.C

}

// クリックスコアを取得する
export const getClickScore = (totalClickCount: number) => {
    if (totalClickCount < 50) {
        // 50回未満
        return ScoreType.S
    }
    if (totalClickCount < 60) {
        // 60回未満
        return ScoreType.A
    }
    if (totalClickCount < 75) {
        // 75回未満
        return ScoreType.B
    }
    // それ以上
    return ScoreType.C
}