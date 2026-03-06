const endObj = {};

// console.log(lgentries[0][1]);
//  console.log(lgentries[0][1][0]);

// console.log(lgentries[0][1][0].weather[0].icon);

for (let i = 0; i < 5; i++) {
  let tempNum = 0;
  let tempObj = {};
  console.log(lgentries[i][0]);
  for (let j = 0; j < lgentries[i][1].length; j++) {
    let tempNum = Number(lgentries[i][1][j].weather[0].icon.slice(0, 2));
    if (!tempObj[tempNum]) {
      tempObj[tempNum] = 1;
    }

    if (tempObj[tempNum]) {
      tempObj[tempNum]++;
    }
  }

  for (let item of Object.entries(tempObj)) {
  }
}
