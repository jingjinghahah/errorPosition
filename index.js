const ErrorStackParser,{ parseV8OrIE } = require("error-stack-parser");

/**
 * 输入：错误堆栈字符串
 * 输入：sourceMap文件路径
 * 输入：原始文件路径
 * 输出：错误位置
 */

function main(err, sourceMap, source) { 
    // 解析错误堆栈字符串
    let ee = ErrorStackParser.parse(new Error('boom'))
    // let errObj = parseV8OrIE(new Error(err));

    console.log(ee);
    // 根据错误堆栈和sourceMap文件找到实际位置


    // 根据实际位置找到相应的文件


}

function parseErr(err) { 
    let arr = err.split('\n');
    arr.forEach(val => {
        val = val.trim();
        if (/^(exception:)/.test(val)) {

        } else if (/^(at )/.test(val)) { 
            
        }
    });
}
main(`exception: (run [/game_preload/QGame.js] failed) Uncaught TypeError: Cannot convert object to primitive value
    at sr (/game_preload/QGame.js:16:243776) 
    at /game_preload/QGame.js:16:246038
    at /game_preload/QGame.js:16:246058
    at r (/game_preload/QGame.js:9:164184) 
    at /game_preload/QGame.js:16:142779
    at r (/game_preload/QGame.js:9:164184) 
    at /game_preload/QGame.js:16:135969
    at r (/game_preload/QGame.js:9:164184) 
    at /game_preload/QGame.js:9:164986
    at /game_preload/QGame.js:9:164996
    at r (/game_preload/QGame.js:1:143) 
    at /game_preload/QGame.js:9:163596
    at r (/game_preload/QGame.js:1:143) 
    at /game_preload/QGame.js:9:111962
    at r (/game_preload/QGame.js:1:143) 
    at s (/game_preload/QGame.js:1:157139) 
    at /game_preload/QGame.js:1:157756
    at /game_preload/QGame.js:1:158427
    at r (/game_preload/QGame.js:1:143) 
    at /game_preload/QGame.js:1:935`)