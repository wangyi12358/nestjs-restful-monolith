let arr = [10, 2, 4, 2, 1, 8, 9];

function main() {
  let max = 0;
  let maxArr = [];

  const length = arr.length;

  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
      for (let k = i + 2; k < length; k++) {
        const currentArr = [arr[i], arr[j], arr[k]];
        if (isContinuityNum(currentArr)) {
          const currentSum = currentArr.reduce((p, c) => p + c);
          if (currentSum > max) {
            max = currentSum;
            maxArr = currentArr;
          }
        }
      }
    }
  }
  console.log('最大值: ', maxArr);
}

// 判断一串数字是否是连续的
function isContinuityNum(num) {
  const array = num.sort((a, b) => a - b);

  let i = array[0];
  let isContinuation = true;
  for (let e in array) {
    if (array[e] !== i) {
      isContinuation = false;
      break;
    }
    i++;
  }
  return isContinuation;
}

main();
