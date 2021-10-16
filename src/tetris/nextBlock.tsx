import React from 'react';

export interface NextBlockType {
    nextIdx: number
}

export const NextBlock: React.VFC<NextBlockType> = ({ ...props }) => {

    //  棒型
    if (props.nextIdx === 0) {
        return (
            <table id="next">
                <tr>
                    <td className="default" data-pos="11"></td>
                    <td className="default" data-pos="12"></td>
                    <td className="default" data-pos="13"></td>
                    <td className="default" data-pos="14"></td>
                    <td className="default" data-pos="15"></td>
                    <td className="default" data-pos="16"></td>
                </tr>
                <tr>
                    <td className="default" data-pos="21"></td>
                    <td className="default" data-pos="22"></td>
                    <td className="default" data-pos="23"></td>
                    <td className="stick" data-pos="24"></td>
                    <td className="default" data-pos="25"></td>
                    <td className="default" data-pos="26"></td>
                </tr>
                <tr>
                    <td className="default" data-pos="31"></td>
                    <td className="default" data-pos="32"></td>
                    <td className="default" data-pos="33"></td>
                    <td className="stick" data-pos="34"></td>
                    <td className="default" data-pos="35"></td>
                    <td className="default" data-pos="36"></td>
                </tr>
                <tr>
                    <td className="default" data-pos="41"></td>
                    <td className="default" data-pos="42"></td>
                    <td className="default" data-pos="43"></td>
                    <td className="stick" data-pos="44"></td>
                    <td className="default" data-pos="45"></td>
                    <td className="default" data-pos="46"></td>
                </tr>
                <tr>
                    <td className="default" data-pos="51"></td>
                    <td className="default" data-pos="52"></td>
                    <td className="default" data-pos="53"></td>
                    <td className="default" data-pos="54"></td>
                    <td className="default" data-pos="55"></td>
                    <td className="default" data-pos="56"></td>
                </tr>
                <tr>
                    <td className="default" data-pos="61"></td>
                    <td className="default" data-pos="62"></td>
                    <td className="default" data-pos="63"></td>
                    <td className="default" data-pos="64"></td>
                    <td className="default" data-pos="65"></td>
                    <td className="default" data-pos="66"></td>
                </tr>
            </table>
        )
    }
    // L字型
    if (props.nextIdx === 1) {
        return (
            <table id="next">
                <tr>
                    <td className="default" data-pos="11"></td>
                    <td className="default" data-pos="12"></td>
                    <td className="default" data-pos="13"></td>
                    <td className="default" data-pos="14"></td>
                    <td className="default" data-pos="15"></td>
                    <td className="default" data-pos="16"></td>
                </tr>
                <tr>
                    <td className="default" data-pos="21"></td>
                    <td className="default" data-pos="22"></td>
                    <td className="default" data-pos="23"></td>
                    <td className="default" data-pos="24"></td>
                    <td className="default" data-pos="25"></td>
                    <td className="default" data-pos="26"></td>
                </tr>
                <tr>
                    <td className="default" data-pos="31"></td>
                    <td className="L" data-pos="32"></td>
                    <td className="default" data-pos="33"></td>
                    <td className="default" data-pos="34"></td>
                    <td className="default" data-pos="35"></td>
                    <td className="default" data-pos="36"></td>
                </tr>
                <tr>
                    <td className="default" data-pos="41"></td>
                    <td className="L" data-pos="42"></td>
                    <td className="L" data-pos="43"></td>
                    <td className="L" data-pos="44"></td>
                    <td className="L" data-pos="45"></td>
                    <td className="default" data-pos="46"></td>
                </tr>
                <tr>
                    <td className="default" data-pos="51"></td>
                    <td className="default" data-pos="52"></td>
                    <td className="default" data-pos="53"></td>
                    <td className="default" data-pos="54"></td>
                    <td className="default" data-pos="55"></td>
                    <td className="default" data-pos="56"></td>
                </tr>
                <tr>
                    <td className="default" data-pos="61"></td>
                    <td className="default" data-pos="62"></td>
                    <td className="default" data-pos="63"></td>
                    <td className="default" data-pos="64"></td>
                    <td className="default" data-pos="65"></td>
                    <td className="default" data-pos="66"></td>
                </tr>
            </table>
        )
    }
    // 親指型
    if (props.nextIdx === 2) {
        return (
            <table id="next">
                <tr>
                    <td className="default" data-pos="11"></td>
                    <td className="default" data-pos="12"></td>
                    <td className="default" data-pos="13"></td>
                    <td className="default" data-pos="14"></td>
                    <td className="default" data-pos="15"></td>
                    <td className="default" data-pos="16"></td>
                </tr>
                <tr>
                    <td className="default" data-pos="21"></td>
                    <td className="default" data-pos="22"></td>
                    <td className="default" data-pos="23"></td>
                    <td className="default" data-pos="24"></td>
                    <td className="default" data-pos="25"></td>
                    <td className="default" data-pos="26"></td>
                </tr>
                <tr>
                    <td className="default" data-pos="31"></td>
                    <td className="default" data-pos="32"></td>
                    <td className="thumb" data-pos="33"></td>
                    <td className="default" data-pos="34"></td>
                    <td className="default" data-pos="35"></td>
                    <td className="default" data-pos="36"></td>
                </tr>
                <tr>
                    <td className="default" data-pos="41"></td>
                    <td className="default" data-pos="42"></td>
                    <td className="thumb" data-pos="43"></td>
                    <td className="thumb" data-pos="44"></td>
                    <td className="default" data-pos="45"></td>
                    <td className="default" data-pos="46"></td>
                </tr>
                <tr>
                    <td className="default" data-pos="51"></td>
                    <td className="default" data-pos="52"></td>
                    <td className="thumb" data-pos="53"></td>
                    <td className="thumb" data-pos="54"></td>
                    <td className="default" data-pos="55"></td>
                    <td className="default" data-pos="56"></td>
                </tr>
                <tr>
                    <td className="default" data-pos="61"></td>
                    <td className="default" data-pos="62"></td>
                    <td className="default" data-pos="63"></td>
                    <td className="default" data-pos="64"></td>
                    <td className="default" data-pos="65"></td>
                    <td className="default" data-pos="66"></td>
                </tr>
            </table>
        )
    }
    // ヘビ型
    if (props.nextIdx === 3) {
        return (
            <table id="next">
                <tr>
                    <td className="default" data-pos="11"></td>
                    <td className="default" data-pos="12"></td>
                    <td className="default" data-pos="13"></td>
                    <td className="default" data-pos="14"></td>
                    <td className="default" data-pos="15"></td>
                    <td className="default" data-pos="16"></td>
                </tr>
                <tr>
                    <td className="default" data-pos="21"></td>
                    <td className="default" data-pos="22"></td>
                    <td className="default" data-pos="23"></td>
                    <td className="default" data-pos="24"></td>
                    <td className="default" data-pos="25"></td>
                    <td className="default" data-pos="26"></td>
                </tr>
                <tr>
                    <td className="default" data-pos="31"></td>
                    <td className="default" data-pos="32"></td>
                    <td className="snake" data-pos="33"></td>
                    <td className="default" data-pos="34"></td>
                    <td className="default" data-pos="35"></td>
                    <td className="default" data-pos="36"></td>
                </tr>
                <tr>
                    <td className="default" data-pos="41"></td>
                    <td className="default" data-pos="42"></td>
                    <td className="snake" data-pos="43"></td>
                    <td className="snake" data-pos="44"></td>
                    <td className="default" data-pos="45"></td>
                    <td className="default" data-pos="46"></td>
                </tr>
                <tr>
                    <td className="default" data-pos="51"></td>
                    <td className="default" data-pos="52"></td>
                    <td className="default" data-pos="53"></td>
                    <td className="snake" data-pos="54"></td>
                    <td className="default" data-pos="55"></td>
                    <td className="default" data-pos="56"></td>
                </tr>
                <tr>
                    <td className="default" data-pos="61"></td>
                    <td className="default" data-pos="62"></td>
                    <td className="default" data-pos="63"></td>
                    <td className="default" data-pos="64"></td>
                    <td className="default" data-pos="65"></td>
                    <td className="default" data-pos="66"></td>
                </tr>
            </table>
        )
    }
    return (
        <table id="next">
            <tr>
                <td className="default" data-pos="11"></td>
                <td className="default" data-pos="12"></td>
                <td className="default" data-pos="13"></td>
                <td className="default" data-pos="14"></td>
                <td className="default" data-pos="15"></td>
                <td className="default" data-pos="16"></td>
            </tr>
            <tr>
                <td className="default" data-pos="21"></td>
                <td className="default" data-pos="22"></td>
                <td className="default" data-pos="23"></td>
                <td className="convex" data-pos="24"></td>
                <td className="default" data-pos="25"></td>
                <td className="default" data-pos="26"></td>
            </tr>
            <tr>
                <td className="default" data-pos="31"></td>
                <td className="default" data-pos="32"></td>
                <td className="convex" data-pos="33"></td>
                <td className="convex" data-pos="34"></td>
                <td className="default" data-pos="35"></td>
                <td className="default" data-pos="36"></td>
            </tr>
            <tr>
                <td className="default" data-pos="41"></td>
                <td className="default" data-pos="42"></td>
                <td className="default" data-pos="43"></td>
                <td className="convex" data-pos="44"></td>
                <td className="default" data-pos="45"></td>
                <td className="default" data-pos="46"></td>
            </tr>
            <tr>
                <td className="default" data-pos="51"></td>
                <td className="default" data-pos="52"></td>
                <td className="default" data-pos="53"></td>
                <td className="default" data-pos="54"></td>
                <td className="default" data-pos="55"></td>
                <td className="default" data-pos="56"></td>
            </tr>
            <tr>
                <td className="default" data-pos="61"></td>
                <td className="default" data-pos="62"></td>
                <td className="default" data-pos="63"></td>
                <td className="default" data-pos="64"></td>
                <td className="default" data-pos="65"></td>
                <td className="default" data-pos="66"></td>
            </tr>
        </table>
    )
}