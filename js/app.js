var list = [
	{
		title:"吃饭打豆豆",
		isCheckbox: true
	},
	{
		title:"企额贷",
		isCheckbox: false
	},
	{
		title:'学会使用Vue',
		isCheckbox:false
	}
];

new Vue({
	el : '.main',
	data:{
		list:list,
		todo:'',
		edtorTodos:'',
		beforeTitle:''
	},
	computed:{
		noChecklength(){
			return this.list.filter(function(item){
				return !item.isCheckbox;
			}).length
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
