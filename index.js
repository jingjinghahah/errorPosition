const { SourceMapConsumer } = require('source-map')
const path = require('path')
const fs = require('fs')
/**
 * 输入err：错误堆栈字符串
 * 输入：sourceMap文件路径
 * 输出sourceMap：错误位置代码相关信息
 */
async function main(err, sourceMap) { 
    // 解析错误堆栈字符串
    let errStack = parseErr(err);
    // 根据错误堆栈和sourceMap文件找到实际位置
    let result = await sourceMapDeal(sourceMap, errStack);
    console.log(result);
}

function parseErr(err) { 
    let arr = err.split('\n');
    let stack = [];
    let msg = '';
    arr.forEach(val => {
        val = val.trim();
        if (/^(exception:)/.test(val)) {
            msg = val;
        } else if (/^(at )/.test(val)) { 
            let res = val.match(/[(]{0,1}(\S+):(\d+):(\d+)/);
            let res1 = val.match(/^at\s+(\S+)\s+\(/);
            if (res) { 
                let url = res[1] ? res[1] : '';
                let line = res[2] ? res[2] : 0;
                let col = res[3] ? res[3] : 0;
                stack.push({
                    code: res1 && res1[1] ? res1[1] : '',
                    url,
                    line,
                    col
                })
            }
        }
    });
    return {
        msg: msg,
        stack: stack
    }
}

async function sourceMapDeal(sourceMapPath, errStack) { 
    let mapPath = path.join('.', sourceMapPath);
    let rawSourceMap = fs.readFileSync(mapPath).toString();
    let consumer = await new SourceMapConsumer(rawSourceMap);
    let stack = errStack.stack;
    return stack.map((value, index) => {
        return getSourceCode(consumer, value, index);  
    });
}

function getSourceCode(consumer,stack,index) { 
    let sm = consumer.originalPositionFor({
        line: parseInt(stack.line),  // 压缩后的行数
        column: parseInt(stack.col)  // 压缩后的列数
    });
    // 压缩前的所有源文件列表
    var sources = consumer.sources;
    // 根据查到的source，到源文件列表中查找索引位置
    var smIndex = sources.indexOf(sm.source);
    if (smIndex >= 0) {
        // 到源码列表中查到源代码
        var smContent = consumer.sourcesContent[smIndex] || '';
        // 将源代码串按"行结束标记"拆分为数组形式
        const rawLines = smContent.split(/\r?\n/g);
        // 输出源码行，因为数组索引从0开始，故行数需要-1
        console.log(rawLines[sm.line - 1]);
        return {
            code: rawLines[sm.line - 1],
            ...sm,
            stack: stack,
            ret: true
        };
    } else { 
        return {
            stack: stack,
            ret: false
        };
    }   
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
    at /game_preload/QGame.js:1:935`, 'E:\\03code\\devtools\\jsLibs\\dist\\QGame.js.map')