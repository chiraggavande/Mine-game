
var connection = new signalR.HubConnectionBuilder().withUrl("/Game").build();
var no_of_ckbs = 100;
var grid = "";

//var mine = Math.floor(Math.random() * (9)) + "" + Math.floor(Math.random() * (9)) ;
//mine = parseInt(mine);
//console.log(mine);
var ckb_arr = [];



connection.start().catch(function (err) {
    return console.error(err.toString());
});

async function sendMsg(i, j) {
    console.log(`${i},${j}`);
    await connection.invoke("SendMessage", i.toString(), j.toString());
}

connection.on("ReceiveMessage", function (i, j,mine) {
    gameLogic(i, j,mine);
});

connection.on("UpdateNameList", function (names) {
    for (n in names) {
        document.getElementById("nameList").appendChild(`<div>${n}</div>`)
    }
})

connection.on("reload", function () {
    alert("gameover someone clicked on a mine!!!!!");
    window.location.reload();
});
async function gameLogic(i,j,mine) {

    ckb_arr[i][j]=1;
    var id =`${i}${j}`
    var intId = parseInt(id)

    var curr_ckb = document.getElementById(id);
    curr_ckb.disabled = true;
    curr_ckb.checked = true;
    
   
    //if ( iid == mine) {
    //    alert("You Clicked on a mine");
    //   await connection.invoke("reload");
        
    //}
    
    did = Math.abs(Math.sqrt( (i-Math.floor(mine/10))**2 + (j - mine % 10)**2)); 
    
    if (did <= 2) {
        curr_ckb.style.backgroundColor = "red"; 
    }
    else if (did <= 4) {
        curr_ckb.style.backgroundColor = "orange"; 
    }
    else if (did <= 6) {
        curr_ckb.style.backgroundColor = "yellow"; 
    }
    else {
        curr_ckb.style.backgroundColor = "green";
    }

}


function CheckboxGrid() {
    for (var i = 0; i < Math.sqrt(no_of_ckbs); i++) {
        var tempGrid = "";
    ckb_arr.push(new Array(Math.sqrt(no_of_ckbs)).fill(0))
        for(var j = 0; j < Math.sqrt(no_of_ckbs); j++){


            tempGrid = tempGrid +  `<div class="grid-item"><input  class=\"box form-check-input bg-transperent \"\" type=\"checkbox\" value=\"\" id=\"${i}${j}\" onclick=\"sendMsg(${i},${j})\"></div>`
;

        }

        grid = grid + tempGrid;
    
        
    }
    document.write(grid);
    
}