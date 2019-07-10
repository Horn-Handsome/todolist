//监听输入框 #write是输入框的Id,name
var inputDom = document.querySelector("#write");
var todoList = document.querySelector(".todo .ctlist");
var doneList = document.querySelector(".done .ctlist");
var todoNumSpan = document.querySelector(".todo h1 .num");
var doneNumSpan = document.querySelector(".done h1 .num");
var main = document.querySelector(".main");

//三元/目运算符 判断是否本地存储了
//JSON.parse()→将JSON格式的字符串转换成数组对象
var dataList=localStorage.dataList?JSON.parse(localStorage.dataList):[];
renderList();

inputDom.onkeypress = function (e) {
	//console.log(e)
//	当用户在输入框按下回车键,并且输入框有内容,那么就将输入框的内容放置到待办事项里,&&并且意思
	if(e.key=="Enter"&&inputDom.value!= ""){
		//往dataList数据里添加代办事项数据
		var data = {
			content:inputDom.value,
			type:"todo"
		}
		dataList.push(data);
		//根据数据渲染列表
		renderList()
		
	}
	
}

function renderList(){
	//JSON.stringify将对象转换成TSON格式的字符串
	localStorage.dataList = JSON.stringify(dataList);
	//每次渲染,将之前的内容清空,重新渲染
	todoList.innerHTML="";
	doneList.innerHTML="";
	var todoNum = 0;
	var doneNum = 0;
	
	dataList.forEach(function (item,index) {
				
		//创建一个新的元素div
		var newDiv = document.createElement("div");
		newDiv.className = "item";
		if (item.type=="todo"){
			todoNum++;
			newDiv.innerHTML = `
            <span class="checkbox">
			<input type="checkbox" name="check" value=""  data-index="${index}"/></span>       
				<span class="content">
					${item.content}
				</span>
				<span class="delete" data-index="${index}"></span>
			`;
			todoList.appendChild(newDiv)
			
    	}else{
    		doneNum++;
			newDiv.innerHTML = `
		    <span class="checkbox">
			<input type="checkbox" name="check" checked="checked" value="" /></span>
				<span class="content">
					${item.content}
				</span>
				<span class="delete" data-index="${index}"></span>
			`;
			doneList.appendChild(newDiv)
		}		
		
	})
		todoNumSpan.innerHTML = todoNum;
		doneNumSpan.innerHTML = doneNum;
}


todoList.onchange=function (e) {
     //console.log(e)
	var index = e.target.dataset.index;
	console.log(index)
	dataList[index].type="done";
	renderList();
}


//删除事项 监听delete事件
main.addEventListener("click",function (e) {
	if(e.target.className=="delete"){
		var index = e.target.dataset.index;
			//console.log(e)
			dataList.splice(index,1);
			renderList();

	}
	
})









