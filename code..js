function generateMatrix(n) {
    var arr = new Array(n);
    for (var i = 0; i < n; i++) {
        arr[i] = new Array(n);
    }
    // generate only half of array, symmetric
    // diagonal is zero
    for (var i = n-1; i > 0; i--) {         // max to small
        for (var j = 0; j < n-1; j++) {       // max to small, will be building up to down, right to left
            var tmp = Math.floor(Math.random() * (10) + 1);
            arr[i][j] = tmp;
            arr[j][i] = tmp;
        }
    }

    for (var i = 0; i < n; i++) {
        arr[i][i] = 0;
    }

    return arr;

}

function tsp_hk(distance_matrix) {
    var n = distance_matrix.length;         
    var shortestPath = Infinity;            
    if (n == 0 || n == 1) {return 0;}       
    var unvisitedNodes = [];           
    for (var j = 0; j < n; j++) { unvisitedNodes.push(j); }
    for (var i = 0; i < n; i++) {             
        var memo = {};                      
        var currentDist;                    
        currentDist = reMemo(distance_matrix,i,unvisitedNodes,memo);       
        if (currentDist < shortestPath) {shortestPath = currentDist;}    
    }
  return shortestPath;
}

function reMemo(graph,currentNode,unvisitedNodes,memo) { 
    var tmpPath = Infinity;                                   
    var currentPath = 0;                                      
    var key = currentNode + '|' + [...unvisitedNodes].sort();  
    if (memo[key] != undefined) {                             
        return memo[key];
    }
    if (unvisitedNodes.length == 2) {
        return graph[unvisitedNodes[0]][unvisitedNodes[1]];    
    }
    else {
        for (var k = 0; k < unvisitedNodes.length; k++) {          
            if (unvisitedNodes[k] == currentNode) { continue; }    
            var indexNode = unvisitedNodes.indexOf(currentNode);   
            var tmpUN = [...unvisitedNodes];                        
            if (indexNode > -1) { tmpUN.splice(indexNode, 1); }
            currentPath = reMemo(graph, unvisitedNodes[k], tmpUN, memo) + graph[currentNode][unvisitedNodes[k]];   
            if (currentPath < tmpPath) {tmpPath = currentPath;}    
        }
        memo[key] = tmpPath;                                  
    }  
    return tmpPath;
}

function tsp_ls(distance_matrix) {
    var shortPath = Infinity;         
    var n = distance_matrix.length;
    if (n == 0 || n == 1) {return 0;}   
    if (n == 2) {return distance_matrix[0][1];}
    var pathArr = [];
    for (var i = 0; i < n; i++) { pathArr.push(i); }
    pathArr = randomPath(pathArr);          // randomize array 
    const itNum = n**3;        
    var prevI = null;
    var prevK = null;
    var i = null; 
    var k = null;
    for (var v = 0; v < itNum; v++) {  
        i = Math.floor(Math.random() * (n-1));
        k = Math.floor(Math.random() * (n-i-1)) + i+1;
        while (i == prevI && k == prevK) {
            i = Math.floor(Math.random() * (n-1));          
            k = Math.floor(Math.random() * (n-i-1)) + i+1;         
        }
        prevI = i;
        prevK = k;
        swap(pathArr,i,k);                                         // make the swap from i to k
        var newLength = calcLength(pathArr,distance_matrix);       // find length of that path
        if (newLength < shortPath) {shortPath = newLength;}
    }
    return shortPath;
}

function randomPath(pathArr) {
    for (var i = 0; i < pathArr.length-2; i++) {
        var j = Math.floor(Math.random() * (pathArr.length));
        var tmp;
        tmp = pathArr[i];
        pathArr[i] = pathArr[j];
        pathArr[j] = tmp;
    }
    return pathArr;
}

function swap(path,i,k) {
    var itNum = Math.ceil((k-i+1)/2);
    for (var v = 0; v < itNum; v++) {
        var tmp = path[i+v];
        path[i+v] = path[k-v];
        path[k-v] = tmp;
    }
}

function calcLength(path, graph) {
    var lenSum = 0;
    for (var i = 0; i < (graph.length - 1); i++) {
        lenSum += graph[path[i]][path[i+1]];
    }
    return lenSum;
}

const max = 21;
for (var n = 0; n <= max; n++) {
var arr = generateMatrix(n); // include input generation complete message
console.log("size: ", n);
const start = Date.now();
console.log("Held Karp: ", tsp_hk(arr));
const end = Date.now();
console.log(`Execution time: ${end - start} ms`);
const start2 = Date.now();
console.log("Local Search: ", tsp_ls(arr));
const end2 = Date.now();
console.log(`Execution time: ${end2 - start2} ms`);
}
