import { cardInfo, CardStatus } from "./MemoryGame";

// ペアになるカードの枚数を宣言
export const total_pair_count = 12;
// ペアになるカードの枚数分の数字の配列を作成 (例：[1,2,3,4...12])
let numbers: number[] = Array(total_pair_count).fill(0).map((v, i) => i + 1);
// 作成した配列をコピーして繋げる。同じ数字が2つずつ格納されている状態。(例：[1,1,2,2,3,3,4,4...12,12])
const doubleNumbers = numbers.concat(numbers);

export const shuffle = (array: number[]): number[] => {
    // 配列をシャッフルするメソッド
    for (let i = array.length - 1; i >= 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1));
        // 配列の数値を入れ替える
        [array[i], array[rand]] = [array[rand], array[i]]
    }
    return array;
}

export const getShuffledIDs = () => shuffle(doubleNumbers)

export const getDefaultCardInfo = (shuffledIDs: number[]): cardInfo[] => {
    return shuffledIDs.map((cardID) => (
        ({
            cardID: cardID,
            status: CardStatus.Default, // 初期値はデフォルト
        })
    ))
}

export const checkMostValue = (array: number[]): number => {
    /*
     * 最も多くクリックした猫の画像のidを返す
     */
    let counter: number[] = Array(array.length).fill(0)

    array.map((ID, idx) => {
        counter[ID]++
    })

    let max_count = Math.max.apply([], Object.values(counter));
    let result = Object.keys(counter).filter((k: string) => {
        return counter[Number(k)] === max_count
    })[0];
    return Number(result)
}