var stote = {
	save(key,value){
		localStorage.setItem(key,JSON.stringify(value));
	},
	fetch(key){
		return JSON.parse(localStorage.getItem(key)) || [];
	}
}


var list = stote.fetch('miaov-class')

var filter = {
	all:function(list){
		return list
	},
	finished:function(list){
		return list.filter(function(item){
			return item.isCheckbox;
		})
	},
	unfinished:function(list){
		return list.filter(function(item){
			return !item.isCheckbox;
		})
	}
}

var vm = new Vue({
	el : '.main',
	data:{
		list:list,
		todo:'',
		edtorTodos:'',
		beforeTitle:'',
		visibility:'all'
	},
	computed:{
		noChecklength(){
			return this.list.filter(function(item){
				return !item.isCheckbox;
			}).length
		},
		filteredList:function(){//过滤

			return filter[this.visibility] ? filter[this.visibility](list) : list;
		}
	},
	watch:{//监听属性
		// list:function(){//监控list属性,浅监控
		// 	stote.save('miaov-class',this.list);
		// }
		list:{
			handler:function(){
				stote.save("miaov-class",this.list);
			},
			deep:true//深监控
		}
	},
	methods:{
		addTodo(){//添加数据
			this.list.push({
				title:this.todo,
				isCheckbox:false
			});
			this.todo = ''
		},
		deleteTodo(todo){//删除数据
			var index = this.list.indexOf(todo);
			this.list.splice(index,1);
		},
		edtorTodo(todo){//编辑数据
			this.beforeTitle = todo.title;
			this.edtorTodos = todo;
		},
		edtorTodoed(todo){//编辑任务成功
			this.edtorTodos = '';
		},
		cancelTodo(todo){//取消编辑任务
			todo.title = this.beforeTitle;
			this.beforeTitle = '';
			this.edtorTodos = '';
		}
	},
	directives:{
		"focus":{
			update(el,binding){
				if(binding.value){
					el.focus();
				}
			}
		}
	}
});
function watchHashChange(){
	var hash = window.location.hash.slice(1);
	vm.visibility = hash;
	console.log(hash);
}
watchHashChange();
window.addEventListener('hashchange',watchHashChange);
